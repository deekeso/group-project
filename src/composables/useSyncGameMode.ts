// composables/useSyncGameMode.ts
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '@/stores/useGameStore'

export function useSyncGameMode(expectedMode: 'mini' | 'classic') {
  const route = useRoute()
  const gameStore = useGameStore()

  onMounted(() => {
    gameStore.setGameMode(expectedMode)
  })

  watch(
    () => route.fullPath,
    () => {
      gameStore.setGameMode(expectedMode)
    },
  )
}
