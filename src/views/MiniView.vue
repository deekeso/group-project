<template>
  <el-container>
    <el-header>
      <HomeButton @home="directToHome" />
      <UserBalance @wallet="directToWallet" />
    </el-header>
    <el-main>
      <div class="grid-paytable-container">
        <PayTable
          kenoType="mini"
          :selectedCellsCount="selectedNumbers.length"
          :matchedCellsCount="displayMatching ? matchedNumbers.length : -1"
          style="padding-bottom: 24px"
        />
        <div class="grid-sidebtn-container">
          <MiniGrid
            @number-selected="setSelectedNumbers"
            :is-round-finished
            @reset-round="resetRound"
          />
          <!-- TODO: Implement autopick logic -->
          <GameSideButtons
            @clear="resetGame"
            @number-selected="autopickNumberSelected"
            :max-number="payTable['mini'].length"
            :game-is-drawing="isDrawing"
          />
        </div>

        <GameButtons
          @playGame="startDraw"
          :game-is-drawing="isDrawing"
          :disabled="selectedNumbers.length < 1"
        />
        <Transition name="bounce"
          ><WithWin
            v-if="result === 'win' && showModal"
            :winValue="winnings"
            @close="showModal = false"
        /></Transition>
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
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import { useKenoResult } from '@/composables/useKenoResult'
import WithWin from '@/components/WithWin.vue'
import NoWin from '@/components/NoWin.vue'
import { useWalletStore } from '@/stores/wallet'
import { ElNotification } from 'element-plus'
import payTable from '@/components/PayTable/payTable.json'

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

onBeforeMount(() => {
  gameStore.setGameMode('mini')
})
// useSyncGameMode('mini')

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
  gameStore.isPlayingToggle()
  displayMatching.value = true

  if (isDrawing.value || drawnNumbers.value.length >= 49) return

  isDrawing.value = true
  let count = 0

  const interval = setInterval(() => {
    miniKenoDraw()
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
  router.push('/wallet')
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
.el-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.el-alert {
  position: absolute;
  top: 0;
  width: fit-content;
}

.el-main {
  display: grid;
  place-items: center;
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
