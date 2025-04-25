<template>
  <div class="side-buttons">
    <AutopickButton @numberSelected="(number: number) => emit('numberSelected', number)" :max-number :game-is-drawing="gameIsDrawing" />
    <ClearButton class="clear-btn" @click="$emit('clear')" :game-is-drawing="gameIsDrawing" />
  </div>
</template>

<script setup lang="ts">
import AutopickButton from './AutopickButton.vue'
import ClearButton from './ClearButton.vue'

const { maxNumber, gameIsDrawing } = defineProps<{
  maxNumber: number
  gameIsDrawing: boolean
}>()

const emit = defineEmits<{
  (e: 'numberSelected', number: number): void
  (e: 'clear'): void
}>()

</script>

<style scoped>
.side-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.clear-btn {
  flex: 1;
  align-content: center;
}
</style>
