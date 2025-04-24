<template>
  <div class="background">
    <div class="top-buttons">
      <HomeButton @home="directToHome" />
      <UserBalance />
    </div>

    <div class="grid-paytable-container">
      <PayTable
        kenoType="mini"
        :selectedCellsCount="selectedNumbers.length"
        :matchedCellsCount="matchedNumbers.length"
        style="padding-bottom: 24px"
      />
      <div class="grid-sidebtn-container">
        <MiniGrid @number-selected="setSelectedNumbers" />
        <GameSideButtons @clear="clearGame" />
      </div>

      <GameButtons @playGame="startDraw" />

      <WithWin
        v-if="result === 'win' && showModal"
        :winValue="winnings"
        @close="showModal = false"
      ></WithWin>
      <NoWin v-if="result === 'lose' && showModal" @close="showModal = false"></NoWin>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameSideButtons from '@/components/GameSideButtons/GameSideButtons.vue'
import UserBalance from '@/components/UserBalance.vue'
import { useKenoResult } from '@/composables/useKenoResult'
import GameDialog from '@/components/GameDialog.vue'
import WithWin from '@/components/WithWin.vue'
import NoWin from '@/components/NoWin.vue'

const router = useRouter()
const gameStore = useGameStore()
const { drawnNumbers, matchedNumbers, selectedNumbers, result, winnings, isPlaying } =
  storeToRefs(gameStore)
const { miniKenoDraw } = useKenoDraw()
const isDrawing = ref(false)
const miniGridSelectedNumbers = ref<number[]>([])

const { winValue, calculatePayout, evaluateGame } = useKenoResult('mini')
const showModal = ref(false)

onMounted(() => {
  gameStore.setGameMode('mini')
})

function startDraw() {
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

      calculatePayout()
      evaluateGame()
      gameStore.isPlayingToggle()

      showModal.value = true
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
.top-buttons {
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  margin-inline: 50px;
  margin-block: 20px;
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
