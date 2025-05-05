<template>
  <el-container class="classic-page">
    <el-dialog v-model="confirmExitDialogVisible" title="Exit game?" width="500" align-center>
      <span>
        You're about to go back to the home page. You will lose your progress after exiting. Are you
        sure?
      </span>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="confirmExitDialogVisible = false">No, I'll keep playing</el-button>
          <el-button type="primary" @click="exitGame">Yes, take me home</el-button>
        </div>
      </template>
    </el-dialog>
    <el-header>
      <HomeButton class="header-button" @home="confirmExitDialogVisible = true" />
      <UserBalance class="header-button" @wallet="directToWallet" />
    </el-header>
    <el-main>
      <div class="grid-paytable-container">
        <TheLegend />

        <!--Display in carousel if there are multiple cards-->
        <el-carousel
          height="auto"
          trigger="click"
          :loop="false"
          :autoplay="false"
          :arrow="numberOfCards > 1 ? 'always' : 'never'"
          :indicator-position="numberOfCards > 1 ? 'outside' : 'none'"
        >
          <el-carousel-item
            v-for="(cards, index) in numberOfCards"
            :key="index"
            height="auto"
            :data-index="index + 1"
          >
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
          </el-carousel-item>
        </el-carousel>

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

import drawSoundEffect from '@/assets/sounds/drawn/612877__sonically_sound__laser-1.flac'
import matchSoundEffect from '@/assets/sounds/match/546974__finix473__ui_click.wav'
import { GameType } from '@/types'
import GameGrid from '@/components/GameGrid.vue'
import PurchaseCard from '@/components/PurchaseCard.vue'

const router = useRouter()
const route = useRoute()
const gameType: GameType = route.meta.gameType as GameType
const gameStore = useGameStore()
const walletStore = useWalletStore()
const { matchedNumbers, selectedNumbers, winnings, result, hasPurchasedCards, numberOfCards } =
  storeToRefs(gameStore)
const { classicKenoDraw, miniKenoDraw, kenoAutopick, resetDraw, resetAutopicked } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const displayMatching = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])
const confirmExitDialogVisible = ref(false)

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

    source.playbackRate.value = 1 + i * 0.05 // Increase pitch each time

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

    if (count >= number) {
      clearInterval(interval)
      isDrawing.value = false
    }
  }, 10)
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
  let route = GameType.Classic

  if (gameType === GameType.Mini) route = GameType.Mini

  router.push({
    name: 'wallet',
    query: {
      redirect: 'classic',
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
.classic-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/game-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
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
  margin-top: 80px;
}
.el-carousel {
  overflow: visible;
}
.el-carousel__item {
  height: auto;
}
::v-deep(.el-carousel__arrow) {
  background-color: #7674a7;
  color: white;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

::v-deep(.el-carousel__arrow:hover) {
  background-color: #8f8ec0;
}
::v-deep(.el-carousel__arrow--left) {
  left: -50px;
}
::v-deep(.el-carousel__arrow--right) {
  right: -50px;
}

/* carousel indicator styles ::v-deep(.el-carousel__indicator) {
  height: 30px;
  width: 30px;
  background-color: lime;
  border-radius: 50%;
  margin: 10px 5px 5px 0px;
}
::v-deep(.el-carousel__indicator.is-active) {
  background-color: #00ff99;
  animation: ease-in-out;
  transform: scale(1.1);
} */
::v-deep(.el-carousel__button) {
  content: '5';
  height: 30px;
  width: 30px;
  background-color: yellow;
  text-align: center;
  border-radius: 10px;
}
::v-deep(.el-carousel__button::before) {
  content: '5';
}
/* ::v-deep(.el-carousel__indicators--outside button) {
  height: 100%;
  width: 100%;
} */

.drawn-numbers {
  display: flex;
  margin-block: 10px;
}

.grid-paytable-container {
  width: 100%;
  max-width: 800px;
  padding: 35px;
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
  .grid-paytable-container {
    padding: 0px;
  }
  ::v-deep(.el-carousel__arrow) {
    width: 20px;
    height: 30px;
    border-radius: 5px;
    display: none;
  }
  ::v-deep(.el-carousel__arrow--left) {
    left: -27px;
  }
  ::v-deep(.el-carousel__arrow--right) {
    right: -27px;
  }
}

/* Small devices (tablets) */
@media (max-width: 768px) {
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
