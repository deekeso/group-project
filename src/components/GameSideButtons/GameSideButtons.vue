<template>
  <div class="side-buttons">
    <AutopickButton @autopick="$emit('autopick')" />
    <ClearButton class="clear-btn" @click="$emit('clear')" />
  </div>
</template>

<script setup lang="ts">
import AutopickButton from './AutopickButton.vue'
import ClearButton from './ClearButton.vue'
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
