<template>
  <el-container class="classic-page">
    <el-dialog v-model="confirmExitDialogVisible" title="Exit game?" class="home-confirmation-dialog" align-center>
      <span>
        You're about to go back to the home page. You will lose your progress after exiting. Are you sure?
      </span>

      <template #footer>
        <el-space alignment="flex-end" :size="10" wrap>
          <el-button @click="confirmExitDialogVisible = false">No, I'll keep playing</el-button>
          <el-button type="primary" @click="exitGame">Yes, take me home</el-button>
        </el-space>
      </template>
    </el-dialog>
    <TutorialDialog v-model:dialog-visible="dialogVisible" />
    <el-header>
      <HomeButton class="header-button" @home="confirmExitDialogVisible = true"/>
      <div class="nav-container">
        <HelpBtn @click="dialogVisible = true" />
        <UserBalance @wallet="directToWallet" />
      </div>
    </el-header>
    <el-main>
      <div class="grid-paytable-container">
        <TheLegend class="legend"/>
        <PayTable
          kenoType="classic"
          :selectedCellsCount="selectedNumbers.length"
          :matchedCellsCount="displayMatching ? matchedNumbers.length : -1"
          style="padding-bottom: 24px"
        />
        <div class="grid-sidebtn-container">
          <GameGrid
            :game-type="gameType"
            @number-selected="setSelectedNumbers"
            :is-round-finished
            @reset-round="resetRound"
          />
          <GameSideButtons
            @clear="resetGame"
            @number-selected="autopickNumberSelected"
            :max-number="payTable[gameType].length"
            :game-is-drawing="isDrawing"
          />
        </div>

        <GameButtons
          @playGame="startDraw"
          :game-is-drawing="isDrawing"
          :disabled="selectedNumbers.length < 1"
        />
        <Transition name="bounce">
          <WithWin
            v-if="result === 'win' && showModal"
            :winValue="winnings"
            @close="showModal = false"
          />
        </Transition>
        <NoWin v-if="result === 'lose' && showModal" />
        <PurchaseCard v-if="!hasPurchasedCards" />
      </div>

    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import GameButtons from '@/components/GameButtons.vue'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import HomeButton from '@/components/HomeButton.vue'
import HelpBtn from '@/components/Help-Btn.vue'
import NoWin from '@/components/NoWin.vue'
import payTable from '@/components/PayTable/payTable.json'
import PayTable from '@/components/PayTable/PayTable.vue'
import TheLegend from '@/components/TheLegend.vue'
import UserBalance from '@/components/UserBalance.vue'
import WithWin from '@/components/WithWin.vue'
import { gameIsDrawingKey } from '@/composables/keys'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { useKenoResult } from '@/composables/useKenoResult'
import { useSyncGameMode } from '@/composables/useSyncGameMode'
import { useGameStore } from '@/stores/useGameStore'
import { useWalletStore } from '@/stores/wallet'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { provide, readonly, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GameType } from '@/types'

// import drawSoundEffect from '@/assets/sounds/drawn/612877__sonically_sound__laser-1.flac'
import drawSoundEffect from '@/assets/sounds/drawn/75250__creek23__click.wav'
import matchSoundEffect from '@/assets/sounds/match/546974__finix473__ui_click.wav'
import toggleSoundEffect from '@/assets/sounds/drawn/75250__creek23__click.wav'
import GameGrid from '@/components/GameGrid.vue'
import PurchaseCard from '@/components/PurchaseCard.vue'
import TutorialDialog from '@/components/TutorialDialog.vue'

const router = useRouter()
const route = useRoute()
const gameType: GameType = route.meta.gameType as GameType
const gameStore = useGameStore()
const walletStore = useWalletStore()
const { matchedNumbers, selectedNumbers, winnings, result, hasPurchasedCards } =
  storeToRefs(gameStore)
const { classicKenoDraw, miniKenoDraw, kenoAutopick, resetDraw, resetAutopicked } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const displayMatching = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])
const confirmExitDialogVisible = ref(false)
const dialogVisible = ref(false)

const { calculatePayout, evaluateGame } = useKenoResult('classic')
const showModal = ref(false)

gameStore.setLoseStreakEffect(() => {
  alert("You lost 20 times. Here's a free spin!")
})

const audioContext = new window.AudioContext()
const soundEffect = new Audio(drawSoundEffect)
const track = audioContext.createMediaElementSource(soundEffect)
const biquadFilter = audioContext.createBiquadFilter()
biquadFilter.type = 'peaking'
biquadFilter.frequency.value = 1000
biquadFilter.gain.value = 10

track.connect(biquadFilter)
biquadFilter.connect(audioContext.destination)

async function playSoundEffect(i: number, soundEffect: string) {
  const response = await fetch(soundEffect)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.playbackRate.value = 1 + i * 0.05 // Increase pitch each time

  source.connect(audioContext.destination)
  source.start()
}

gameStore.setMatchCallback((i) => {
  playSoundEffect(i, matchSoundEffect)
})
//
provide(gameIsDrawingKey, readonly(isDrawing))

useSyncGameMode('classic')

async function startDraw() {
  // Check balance before playing
  if (walletStore.balance < gameStore.wager) {
    ElNotification({
      title: 'Insufficient Balance',
      message: 'Please top up your wallet or adjust your wager.',
      type: 'error',
      position: 'top-right',
      duration: 2000,
      showClose: true,
    })
    return
  }

  resetDraw()
  displayMatching.value = true

  isDrawing.value = true
  let count = 0

  async function playSoundEffect(i: number, soundEffect: string) {
    const response = await fetch(soundEffect)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const source = audioContext.createBufferSource()
    source.buffer = audioBuffer

    source.playbackRate.value = 1 + i * 0.005 // Increase pitch each time

    source.connect(audioContext.destination)
    source.start()
  }

  const interval = setInterval(() => {
    if (gameType === GameType.Classic) {
      classicKenoDraw()
    } else if (gameType === GameType.Mini) {
      miniKenoDraw()
    }
    playSoundEffect(count, drawSoundEffect)
    count++
    const maxDraw = gameType === GameType.Classic ? 20 : 10
    if (count >= maxDraw) {
      clearInterval(interval)
      isDrawing.value = false
      isRoundFinished.value = true

      evaluateGame()
      displayResult()
    }
  }, 150)
}

function autopickNumberSelected(number: number) {
  if (isDrawing.value) return
  isDrawing.value = true
  resetAutopicked()
  isRoundFinished.value = true
  let count = 0

  const interval = setInterval(() => {
    kenoAutopick(number, gameType)
    count++
    playSoundEffect(0, toggleSoundEffect)
    if (count >= number) {
      clearInterval(interval)
      isDrawing.value = false
    }
  }, 50)
  displayMatching.value = false
}

function resetRound() {
  gameStore.resetGame(true)
  isRoundFinished.value = false
}

function resetGame() {
  if (isDrawing.value) return
  gameStore.resetGame()
}

function setSelectedNumbers(numbers: number[]) {
  miniGridSelectedNumbers.value = numbers
  displayMatching.value = false
}

function directToHome() {
  router.push('/home')
}

function directToWallet() {
  let r = GameType.Classic

  if (gameType === GameType.Mini) r = GameType.Mini

  router.push({
    name: 'wallet',
    query: {
      redirect: r,
    },
  })
}

function displayResult() {
  setTimeout(() => {
    calculatePayout()
    showModal.value = true
  }, 150)
  showModal.value = false
}

function exitGame() {
  gameStore.resetGame()
  gameStore.resetPurchase()
  directToHome()
}
</script>

<style scoped>
* {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.classic-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/game-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  background: transparent;
}

.el-main {
  display: grid;
  place-items: center;
  background: transparent;
  flex: 1;
}

.drawn-numbers {
  display: flex;
  margin-block: 10px;
}

.grid-paytable-container {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.grid-sidebtn-container {
  width: 100%;
  display: grid;
  grid-template-columns: 9fr 1fr;
  gap: 10px;
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

::v-deep(.home-confirmation-dialog) {
  --el-dialog-width: 100%;
  max-width: 500px;
}

::v-deep(.el-overlay-dialog:has(.home-confirmation-dialog)) {
  padding: 0 40px;
}

/* TODO: Try to move this to TutorialDialog.vue */
::v-deep(.help-dialog) {
  background-color: #060351;
}

::v-deep(.el-dialog__body) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.el-space {
  display: flex;
  justify-content: end;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
}

/* Extra small devices (phones) */
@media (max-width: 576px) {
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .legend {
    display: none;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(0.5);
    }

    100% {
      transform: scale(0.5);
    }
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
