<template>
  <div class="debug-tools">
    <button @click="trigger20Losses">Trigger 20 losses</button>
    <!-- <BonusSpin /> -->
    <!-- <BonusSpin /> -->
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import BonusSpin from '@/components/BonusSpin.vue'

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
