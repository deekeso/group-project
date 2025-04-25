<template>
  <button class="clear-btn" :disabled="gameIsDrawing">
    <img src="../../assets/Trash.png" alt="clear icon" />
  </button>
</template>

<script setup lang="ts">
  const { gameIsDrawing } = defineProps<{
  gameIsDrawing: boolean
}>()

</script>

<style scoped>
.clear-btn {
  background: #060041;
  text-align: center;
  padding-block: 10px;
  border: 5px solid #7540c1;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 100ms, opacity 1000ms, background 100ms;
  user-select: none;
}

.clear-btn img {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.clear-btn:enabled:hover:active {
  transform: translateY(2px);
}

.clear-btn:enabled:hover {
  background: #7540c1;
}

.clear-btn:disabled {
  opacity: 0.7;
}

.clear-btn:disabled:hover {
  cursor: not-allowed;
}
</style>
