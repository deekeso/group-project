<template>
  <div class="keno-ball">{{ number }}</div>
</template>

<script setup lang="ts">
defineProps<{
  number: number
}>()
</script>

<style scoped>
.keno-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, #fbc02d);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}
</style>
