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
          :matchedCellsCount="matchedNumbers.length"
          style="padding-bottom: 24px"
        />
        <div class="grid-sidebtn-container">
          <MiniGrid
            @number-selected="setSelectedNumbers"
            :is-round-finished
            @reset-round="resetRound"
          />
          <GameSideButtons @clear="gameStore.resetGame" />
        </div>

        <GameButtons @playGame="startDraw" :game-is-drawing="isDrawing" />
        <WithWin
          v-if="result === 'win' && showModal"
          :winValue="winnings"
          @close="showModal = false"
        />
        <NoWin
          v-if="result === 'lose' && showModal"
          @close="showModal = false"
          @home="directToHome"
        />
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import { useKenoResult } from '@/composables/useKenoResult'
import WithWin from '@/components/WithWin.vue'
import NoWin from '@/components/NoWin.vue'
import { useWalletStore } from '@/stores/wallet'
import { ElNotification } from 'element-plus'
import { useSyncGameMode } from '@/composables/useSyncGameMode'

const router = useRouter()
const gameStore = useGameStore()
const walletStore = useWalletStore()
const { drawnNumbers, matchedNumbers, selectedNumbers, result, winnings } = storeToRefs(gameStore)
const { miniKenoDraw } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const errorMessage = ref('')
const miniGridSelectedNumbers = ref<number[]>([])

const { calculatePayout, evaluateGame } = useKenoResult('mini')
const showModal = ref(false)

// onMounted(() => {
//   gameStore.setGameMode('mini')
// })
useSyncGameMode('mini')

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

  useKenoDraw().resetDraw()

  gameStore.isPlayingToggle()

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
      gameStore.isPlayingToggle()
      displayResult()
    }
  }, 150)
}

function setSelectedNumbers(numbers: number[]) {
  miniGridSelectedNumbers.value = numbers
}

function resetRound() {
  gameStore.resetGame(true)
  isRoundFinished.value = false
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
  }, 1000)
  showModal.value = false
}
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
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
</style>
