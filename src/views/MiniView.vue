<template>
  <el-container class="mini-page">
    <el-header>
      <HomeButton @home="directToHome" />
      <UserBalance @wallet="directToWallet" />
    </el-header>
    <el-main>
      <div class="grid-paytable-container">
        <TheLegend />
        <PayTable kenoType="mini" :selectedCellsCount="selectedNumbers.length"
          :matchedCellsCount="displayMatching ? matchedNumbers.length : -1" style="padding-bottom: 24px" />
        <div class="grid-sidebtn-container">
          <MiniGrid @number-selected="setSelectedNumbers" :is-round-finished @reset-round="resetRound" />
          <!-- TODO: Implement autopick logic -->
          <GameSideButtons @clear="resetGame" @number-selected="autopickNumberSelected"
            :max-number="payTable['mini'].length" :game-is-drawing="isDrawing" />
        </div>

        <GameButtons @playGame="startDraw" :game-is-drawing="isDrawing" :disabled="selectedNumbers.length < 1" />
        <Transition name="bounce">
          <WithWin v-if="result === 'win' && showModal" :winValue="winnings" @close="showModal = false" />
        </Transition>
        <NoWin v-if="result === 'lose' && showModal" />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import GameButtons from '@/components/GameButtons.vue'
import HomeButton from '@/components/HomeButton.vue'
import MiniGrid from '@/components/MiniKeno/MiniGrid.vue'
import PayTable from '@/components/PayTable/PayTable.vue'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount, provide, readonly, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import { useKenoResult } from '@/composables/useKenoResult'
import WithWin from '@/components/WithWin.vue'
import NoWin from '@/components/NoWin.vue'
import { useWalletStore } from '@/stores/wallet'
import { ElNotification } from 'element-plus'
// import { useSyncGameMode } from '@/composables/useSyncGameMode'
import payTable from '@/components/PayTable/payTable.json'
import { gameIsDrawingKey } from '@/composables/keys'
import TheLegend from '@/components/TheLegend.vue'

import drawSoundEffect from '@/assets/sounds/drawn/612877__sonically_sound__laser-1.flac'
import matchSoundEffect from '@/assets/sounds/match/546974__finix473__ui_click.wav'

const router = useRouter()
const gameStore = useGameStore()
const walletStore = useWalletStore()
const { drawnNumbers, matchedNumbers, selectedNumbers, winnings, result } = storeToRefs(gameStore)
const { miniKenoDraw, resetAutopicked, resetDraw, kenoAutopick } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const errorMessage = ref('')
const displayMatching = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

const { calculatePayout, evaluateGame } = useKenoResult('mini')
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
  console.log(i)
  const response = await fetch(soundEffect);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  source.playbackRate.value = 1 + (i * 0.05); // Increase pitch each time

  source.connect(audioContext.destination);
  source.start()
}

gameStore.setMatchCallback((i) => {
  playSoundEffect(i, matchSoundEffect)
})

onBeforeMount(() => {
  gameStore.setGameMode('mini')
})
// useSyncGameMode('mini')
provide(gameIsDrawingKey, readonly(isDrawing))

function startDraw() {
  // Check balance before playing
  if (walletStore.balance < gameStore.wager) {
    ElNotification({
      title: 'Insufficient Balance',
      message: 'Please top up your wallet or adjust your wager.',
      type: 'error',
      position: 'top-right',
      duration: 3000,
      showClose: true,
    })
    return
  }

  errorMessage.value = '' // Clear previous error if any

  resetDraw()
  displayMatching.value = true

  if (isDrawing.value || drawnNumbers.value.length >= 49) return

  isDrawing.value = true
  let count = 0

  async function playSoundEffect(i: number, soundEffect: string) {
    const response = await fetch(soundEffect);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.playbackRate.value = 1 + (i * 0.05); // Increase pitch each time

    source.connect(audioContext.destination);
    source.start()
  }

  const interval = setInterval(() => {
    miniKenoDraw()
    playSoundEffect(count, drawSoundEffect)
    count++

    if (count >= 10 || drawnNumbers.value.length >= 49) {
      clearInterval(interval)
      isDrawing.value = false
      isRoundFinished.value = true

      evaluateGame()
      displayResult()
    }
  }, 100)
}

function setSelectedNumbers(numbers: number[]) {
  miniGridSelectedNumbers.value = numbers
}

function startAutoPick(number: number) {
  if (isDrawing.value) return
  resetAutopicked()
  isRoundFinished.value = true
  let count = 0

  const interval = setInterval(() => {
    kenoAutopick(number, 'mini')
    count++

    if (count >= number) {
      clearInterval(interval)
    }
  }, 10)
  displayMatching.value = false
}

function autopickNumberSelected(number: number) {
  startAutoPick(number)
}

function resetRound() {
  gameStore.resetGame(true)
  isRoundFinished.value = false
}

function resetGame() {
  if (isDrawing.value) return
  gameStore.resetGame()
}

function directToHome() {
  router.push('/home')
}

function directToWallet() {
  router.push({
    name: 'wallet',
    query: {
      redirect: 'mini'
    }
  })
}
function displayResult() {
  setTimeout(() => {
    calculatePayout()
    showModal.value = true
  }, 500)
  showModal.value = false
}
</script>

<style scoped>
.mini-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/game-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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

.el-alert {
  position: absolute;
  top: 0;
  width: fit-content;
}

.el-main {
  display: grid;
  place-items: center;
  background: transparent;
}

.grid-paytable-container {
  width: fit-content;
  margin: 0 auto;
}

.grid-sidebtn-container {
  display: flex;
  gap: 10px;
}

.background {
  height: 100vh;
  width: 100%;
  align-content: center;
  background-image: url('src/assets/game-background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.autopick {
  height: 100%;
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
</style>
