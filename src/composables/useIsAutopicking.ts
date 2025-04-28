import { inject } from "vue";
import { isAutopickingKey } from "@/composables/keys";

export function useIsAutopicking() {

  const isAutopicking = inject(isAutopickingKey)
  if (!isAutopicking) {
    throw new Error('useIsAutopicking must be used inside a provider for isAutopickingKey')
  }

  return useIsAutopicking
}
