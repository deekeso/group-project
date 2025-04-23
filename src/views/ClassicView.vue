<template>
  <div class="background">
    <div class="top-buttons">
      <HomeButton @home="directToHome" />
      <UserBalance />
    </div>

    <div class="grid-paytable-container">
      <PayTable
        kenoType="classic"
        :selectedCellsCount="selectedNumbers.length"
        :matchedCellsCount="matchedNumbers.length"
        style="padding-bottom: 24px"
      />
      <div class="grid-sidebtn-container">
        <ClassicGrid @number-selected="setSelectedNumbers" />
        <GameSideButtons @clear="gameStore.resetGame" />
      </div>

      <GameButtons @playGame="startDraw" />
    </div>
  </div>
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

function directToHome() {
  router.push('/home')
}
</script>

<style scoped>
.top-buttons {
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  margin-inline: 50px;
  margin-block: 20px;
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
