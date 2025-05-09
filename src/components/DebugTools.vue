<template>
  <div class="debug-tools">
    <button @click="trigger20Losses">Trigger 20 losses</button>
    <button @click="emit('pickNumbers')">Autopick numbers</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'

const emit = defineEmits<{
  (e: 'pickNumbers'): void
}>()

const { setLostStreak, setResult } = useGameStore()

function trigger20Losses() {
  setLostStreak(19)
  setResult('lose')
}
</script>

<style scoped>
.debug-tools {
  display: block;
  background: white;
  padding: 10px;
  position: relative;
  z-index: 2000;
}
</style>
