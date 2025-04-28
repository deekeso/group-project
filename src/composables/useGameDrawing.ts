import { inject } from "vue";
import { gameIsDrawingKey } from "@/composables/keys";

export function useGameDrawing() {
  const isDrawing = inject(gameIsDrawingKey)
  if (!isDrawing) {
    throw new Error('useGameDrawing must be used inside a provider for gameIsDrawingKey')
  }

  return isDrawing
}
