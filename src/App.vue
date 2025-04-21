<script setup lang="ts">
import { useGameStore } from './stores/useGameStore'

const gameStore = useGameStore()
gameStore.loadFromStorage()

// Just router view, no other components needed
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #060351;
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

/* Import fonts properly */
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
</style>
