<template>
  <el-container>
      <el-header>
        <HomeButton @home="directToHome" />
        <UserBalance @wallet="directToWallet"/>
      </el-header>
      <el-main>
        <div class="grid-paytable-container">
          <PayTable
            kenoType="mini"
            :selectedCellsCount="selectedNumbers.length"
            :matchedCellsCount="isRoundStarted ? matchedNumbers.length : -1"
            style="padding-bottom: 24px"
          />
          <div class="grid-sidebtn-container">
            <MiniGrid @number-selected="setSelectedNumbers" :is-round-finished @reset-round="resetRound"/>
            <GameSideButtons @clear="gameStore.resetGame" />
          </div>
    
          <GameButtons @playGame="startDraw" :game-is-drawing="isDrawing" />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'

const router = useRouter()
const gameStore = useGameStore()
const { drawnNumbers, matchedNumbers, selectedNumbers } = storeToRefs(gameStore)
const { miniKenoDraw } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const isRoundStarted = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

function startDraw() {
  isRoundStarted.value = true
  gameStore.setDrawnNumbers([])
  useKenoDraw().resetDraw()
  matchedNumbers.value = []

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
      isRoundStarted.value = false
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
