<template>
  <div></div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import failSound from '@/assets/sounds/nowin/8-bit-video-game-fail-version-2-145478.mp3'

const playLoseSound = () => {
  const audio = new Audio(failSound)
  audio.play()
}

onMounted(() => {
  playLoseSound()
  ElMessage({
    message: "No luck this round. Let's go again!",
    type: 'error',
    plain: true,
  })
})
</script>
