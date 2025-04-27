<template>
  <el-container>
    <el-header>
      <HomeButton @home="directToHome" />
      <UserBalance @wallet="directToWallet" />
    </el-header>
    <el-main>
      <div class="grid-paytable-container">
        <PayTable
          kenoType="classic"
          :selectedCellsCount="selectedNumbers.length"
          :matchedCellsCount="displayMatching ? matchedNumbers.length : -1"
          style="padding-bottom: 24px"
        />
        <div class="grid-sidebtn-container">
          <ClassicGrid
            @number-selected="setSelectedNumbers"
            :is-round-finished
            @reset-round="resetRound"
          />
          <!-- TODO: Implement autopick logic -->
          <GameSideButtons @clear="resetGame" @number-selected="autopickNumberSelected" :max-number="payTable['classic'].length"/>
        </div>

        <GameButtons @playGame="startDraw" :game-is-drawing="isDrawing" :disabled="selectedNumbers.length < 1"  />
        <WithWin
          v-if="result === 'win' && showModal"
          :winValue="winnings"
          @close="showModal = false"
        />
        <!-- <NoWin
          v-if="result === 'lose' && showModal"
          @close="showModal = false"
          @home="directToHome"
        /> -->
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import WithWin from '@/components/WithWin.vue'
// import NoWin from '@/components/NoWin.vue'
import ClassicGrid from '@/components/ClassicKeno/ClassicGrid.vue'
import GameButtons from '@/components/GameButtons.vue'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import HomeButton from '@/components/HomeButton.vue'
import PayTable from '@/components/PayTable/PayTable.vue'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { provide, readonly, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useKenoResult } from '@/composables/useKenoResult'
import { ElNotification } from 'element-plus'
import { useWalletStore } from '@/stores/wallet'
import { useSyncGameMode } from '@/composables/useSyncGameMode'
import payTable from '@/components/PayTable/payTable.json'
import { gameIsDrawingKey } from '@/composables/keys'

const router = useRouter()
const gameStore = useGameStore()
const walletStore = useWalletStore()
const { drawnNumbers, matchedNumbers, selectedNumbers, winnings, result } = storeToRefs(gameStore)
const { classicKenoDraw, kenoAutopick, resetDraw, resetAutopicked } = useKenoDraw()
const isDrawing = ref(false)
// const isAutopicking = ref(false)
const isRoundFinished = ref(false)
const displayMatching = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

const { calculatePayout, evaluateGame } = useKenoResult('classic')
const showModal = ref(false)

// onMounted(() => {
//   gameStore.setGameMode('classic')
// })

//
provide(gameIsDrawingKey, readonly(isDrawing))
// provide(isAutopickingKey, readonly(isAutopicking))

useSyncGameMode('classic')

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

  resetDraw()
  gameStore.isPlayingToggle()
  displayMatching.value = true

  if (isDrawing.value || drawnNumbers.value.length >= 49) return

  isDrawing.value = true
  let count = 0

  const interval = setInterval(() => {
    classicKenoDraw()
    count++

    if (count >= 20 || drawnNumbers.value.length >= 49) {
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
    kenoAutopick(number, 'classic')
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
.drawn-numbers {
  display: flex;
  margin-block: 10px;
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
  background-image: url(src/assets/game-background.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
