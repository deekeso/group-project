<template>
  <div class="keno-grid">
    <el-card class="container">
      <div class="grid">
        <div
          v-for="number in 49"
          :key="number"
          class="keno-cell"
          :class="{ selected: selectedNumbers.includes(number) }"
          @click="toggleNumber(number)"
        >
          {{ number }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Declare types
const selectedNumbers = ref<number[]>([])

const emit = defineEmits<{
  (e: 'numberSelected', numbers: number[]): void
}>()

// Function to toggle number selection
function toggleNumber(number: number): void {
  const index = selectedNumbers.value.indexOf(number)
  if (index === -1) {
    selectedNumbers.value.push(number)
  } else {
    selectedNumbers.value.splice(index, 1)
  }
  emit('numberSelected', selectedNumbers.value)
}
</script>

<style scoped>
/* .grid-item {
  background-color: hsla(270, 71%, 59%, 75%);
  text-align: center;
  font-size: 2rem;
  margin: 5px;
  border-radius: 5px;
} */
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

.keno-cell:hover {
  background-color: hsla(270, 68%, 69%, 0.75);
}

.keno-cell.selected {
  background-color: #d8cf50;
  color: rgb(51, 33, 7);
  border-color: #409eff;
}
</style>
