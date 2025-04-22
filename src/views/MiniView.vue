<template>
  <div class="background">
    <div class="grid-paytable-container">
      <MiniGrid @number-selected="setSelectedNumbers" />
      <PayTable
        kenoType="mini"
        :selectedCellsCount
        :matchedCellsCount="matchedNumbers.length"
        style="padding-top: 24px"
      />
      <GameButtons @playGame="startDraw" />
    </div>
    <!-- <el-button @click="startDraw" :disabled="drawnNumbers.length >= 49">Draw Number</el-button>
    <el-button @click="resetDraw" :disabled="isDrawing">Reset</el-button> -->
  </div>
</template>

<script setup lang="ts">
import GameButtons from '@/components/GameButtons.vue'
import MiniGrid from '@/components/MiniKeno/MiniGrid.vue'
import PayTable from '@/components/PayTable/PayTable.vue'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const gameStore = useGameStore()
const { drawnNumbers, matchedNumbers } = storeToRefs(gameStore)
const { drawNumber } = useKenoDraw()
const isDrawing = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])
const selectedCellsCount = computed(() => miniGridSelectedNumbers.value.length)

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
