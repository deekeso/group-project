<template>
  <div class="keno-grid">
    <div class="container">
      <div class="grid">
        <div v-for="number in 80" :key="number" class="keno-cell" :class="[
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
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { selectedNumbers, matchedNumbers, drawnNumbers } = storeToRefs(gameStore)

const emit = defineEmits<{
  (e: 'numberSelected', numbers: number[]): void
  (e: 'resetRound'): void
}>()

const { isRoundFinished } = defineProps<{
  isRoundFinished: boolean
}>()

// Function to toggle number selection
function toggleNumber(number: number): void {
  if (isRoundFinished) {
    matchedNumbers.value = []
    drawnNumbers.value = []
    emit('resetRound')
  }
  const index = selectedNumbers.value.indexOf(number)
  if (index > -1) {
    selectedNumbers.value.splice(index, 1)
  } else if (selectedNumbers.value.length < 15) {
    selectedNumbers.value.push(number)
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

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
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
}

.cell:hover {
  background-color: hsl(270, 68%, 69%);
}

.cell.selected {
  background-color: #bb78ff;
  color: #ffffff;
  border: 4px solid #e7cfff;
}

.cell.matched {
  background-color: #37eb1f;
  color: #094201;
  border: 4px solid #37eb1f;
}

.cell.missed {
  background: #ff7779;
  color: #4b0405;
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

  .grid {
    gap: 2px;
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
