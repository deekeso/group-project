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
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');
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
  background-image: url('./assets/Menu Background.png');
  background-repeat: no-repeat;
  background-size: cover;
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
</style>
