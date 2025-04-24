<template>

    <el-container>
      <el-header>
        <HomeButton @home="directToHome" />
        <UserBalance @wallet="directToWallet"/>
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
            <ClassicGrid @number-selected="setSelectedNumbers" :is-round-finished @reset-round="resetRound"/>
            <GameSideButtons @clear="gameStore.resetGame" />
          </div>
    
          <GameButtons @playGame="startDraw" :game-is-drawing="isDrawing" />
        </div>
      </el-main>
    </el-container>
</template>

<script setup lang="ts">
import ClassicGrid from '@/components/ClassicKeno/ClassicGrid.vue'
import GameButtons from '@/components/GameButtons.vue'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import HomeButton from '@/components/HomeButton.vue'
import PayTable from '@/components/PayTable/PayTable.vue'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const gameStore = useGameStore()
const { drawnNumbers, matchedNumbers, selectedNumbers } = storeToRefs(gameStore)
const { classicKenoDraw } = useKenoDraw()
const isDrawing = ref(false)
const isRoundFinished = ref(false)
const displayMatching = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

function startDraw() {
  gameStore.setDrawnNumbers([])
  useKenoDraw().resetDraw()
  matchedNumbers.value = []
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
    }
  }, 150)
}

function resetRound() {
  gameStore.resetGame(true)
  isRoundFinished.value = false
  displayMatching.value = false
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
