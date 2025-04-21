<template>
  <div class="keno-grid">
    <el-card class="container">
      <div class="grid">
        <div
          v-for="number in 49"
          :key="number"
          class="keno-cell"
          :class="[
            'cell',
            selectedNumbers.includes(number) ? 'selected' : '',
            matchedNumbers.includes(number) ? 'matched' : '',
          ]"
          @click="toggleNumber(number)"
        >
          {{ number }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { selectedNumbers, matchedNumbers } = storeToRefs(gameStore)

// Function to toggle number selection
function toggleNumber(number: number): void {
  const index = selectedNumbers.value.indexOf(number)
  if (index > -1) {
    selectedNumbers.value.splice(index, 1)
  } else if (selectedNumbers.value.length < 10) {
    selectedNumbers.value.push(number)
  }
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
  grid-template-columns: repeat(7, 60px);
  gap: 5px;
}
.container {
  border: none;
}
.keno-cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2rem;
  background-color: hsla(270, 71%, 59%, 75%);
  /* border: 1px solid #dcdfe6; */
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cell:hover {
  background-color: hsla(270, 68%, 69%, 0.75);
}

.cell.selected {
  background-color: #d8cf50;
  color: rgb(51, 33, 7);
  border-color: #409eff;
}
.cell.matched {
  background-color: rgb(2, 165, 2);
}
</style>
