<template>
  <div class="keno-grid">
    <div class="container">
      <div :class="`${gameType}-grid`">
        <div v-for="number in cellCount" :key="number" class="keno-cell" :class="[
          'cell',
          matchedNumbers.includes(number) ? 'matched' :
            drawnNumbers.includes(number) && !selectedNumbers.includes(number) ? 'missed' :
              selectedNumbers.includes(number) ? 'selected' : '',
        ]" @click="toggleNumber(number)">
          {{ number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameDrawing } from '@/composables/useGameDrawing'
import { useGameStore } from '@/stores/useGameStore'
import { GameType } from '@/types';
import { storeToRefs } from 'pinia'
import toggleSoundEffect from '@/assets/sounds/drawn/75250__creek23__click.wav'

const gameStore = useGameStore()
const { selectedNumbers, matchedNumbers, drawnNumbers } = storeToRefs(gameStore)
const isDrawing = useGameDrawing()

const emit = defineEmits<{
  (e: 'numberSelected', numbers: number[]): void
  (e: 'resetRound'): void
}>()

const { isRoundFinished, gameType } = defineProps<{
  isRoundFinished: boolean
  gameType: GameType
}>()

const cellCount = gameType === GameType.Classic ? 80 : gameType === GameType.Mini ? 49 : 80

// Function to toggle number selection
function toggleNumber(number: number): void {
  if (isDrawing.value) return
  if (isRoundFinished) {
    matchedNumbers.value = []
    drawnNumbers.value = []
    emit('resetRound')
  }
  const index = selectedNumbers.value.indexOf(number)
  if (index > -1) {
    selectedNumbers.value.splice(index, 1)
    new Audio(toggleSoundEffect).play()
  } else if (selectedNumbers.value.length < 15) {
    selectedNumbers.value.push(number)
    new Audio(toggleSoundEffect).play()
  }
  emit('numberSelected', selectedNumbers.value)
}
</script>

<style scoped>
.el-card {
  background-color: transparent;
}

.el-card:deep(.el-card__body) {
  padding: 0;
}

.keno-grid {
  background-color: transparent;
}

.classic-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 5px;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 5px;
}

.container {
  border: none;
}

.keno-cell {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2rem;
  background-color: #846ccf;
  /* border: 1px solid #dcdfe6; */
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
  overflow: hidden
}

.cell:not(.disabled):not(.matched):not(.missed):hover {
  background-color: #bb78ff;
}

.cell.selected {
  background-color: #bb78ff;
  color: #ffffff;
  border: 4px solid #e7cfff;
}

.cell.matched {
  background-color: #37eb1f;
  color: #094201;
  border: 4px solid #094201;
  animation:
    emphasize 0.55s,
    shine 0.55s;
}

.cell.missed {
  background: #ff7779;
  color: #4b0405;
}
.disabled {
  cursor: not-allowed;
}

@keyframes emphasize {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(0.9) rotate(-5deg);
  }
  50% {
    transform: scale(0.9) rotate(5deg);
    background-color: #bcffb3;
  }
  75% {
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}


/* Extra small devices (phones) */
@media (max-width: 576px) {
  .keno-cell {
    font-size: 0.8rem;
  }
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  /* Styles for tablets */
  .keno-cell {
    padding: 10px 0;
  }

  .classic-grid, .mini-grid {
    gap: 2px;
  }
  .keno-cell {
    font-size: 1rem;
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
