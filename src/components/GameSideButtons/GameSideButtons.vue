<template>
  <div class="side-buttons">
    <AutopickButton
      @numberSelected="(number: number) => emit('numberSelected', number)"
      :max-number
    />
    <ClearButton class="clear-btn" @click="$emit('clear')" />
  </div>
</template>

<script setup lang="ts">
import AutopickButton from './AutopickButton.vue'
import ClearButton from './ClearButton.vue'
import { useTour } from '@/composables/useTour'

const { tourSteps } = useTour()

const { maxNumber } = defineProps<{
  maxNumber: number
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
  gap: 5px;
}
.clear-btn {
  flex: 1;
  align-content: center;
}
</style>
