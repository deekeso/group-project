<template>
  <div class="background">
    <HomeButton @home="directToHome" />
    <div class="grid-paytable-container">
      <PayTable
        kenoType="mini"
        :selectedCellsCount="selectedNumbers.length"
        :matchedCellsCount="matchedNumbers.length + 1"
        style="padding-bottom: 24px"
      />
      <div class="grid-sidebtn-container">
        <MiniGrid @number-selected="setSelectedNumbers" />
        <GameSideButtons @clear="clearGame" />
      </div>

      <GameButtons @playGame="startDraw" />
    </div>
  </div>
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

const router = useRouter()
const gameStore = useGameStore()
const { drawnNumbers, matchedNumbers, selectedNumbers } = storeToRefs(gameStore)
const { drawNumber } = useKenoDraw()
const isDrawing = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

function startDraw() {
  gameStore.setDrawnNumbers([])
  useKenoDraw().resetDraw()
  matchedNumbers.value = []

  if (isDrawing.value || drawnNumbers.value.length >= 49) return

  isDrawing.value = true
  let count = 0

  const interval = setInterval(() => {
    drawNumber()
    count++

    if (count >= 10 || drawnNumbers.value.length >= 49) {
      clearInterval(interval)
      isDrawing.value = false
    }
  }, 150)
}

function setSelectedNumbers(numbers: number[]) {
  miniGridSelectedNumbers.value = numbers
}

function clearGame() {
  gameStore.resetGame()
}

function directToHome() {
  router.push('/home')
}
</script>

<style scoped>
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
  background-image: url('src/assets/game-background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.autopick {
  height: 100%;
}
</style>
