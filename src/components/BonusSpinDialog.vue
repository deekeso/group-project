<template>
  <div>
    <el-dialog class="roulette-dialog" v-model="dialogVisible" width="50%" align-center destroy-on-close
      :close-on-click-modal="isSpinFinished" :close-on-press-escape="isSpinFinished" :show-close="isSpinFinished" :z-index="2999">
      <h1 class="roulette-title">Roulette of Recovery</h1>
      <button ref="buttonRef">Spin roulette</button>
      <div id="chart">
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useUtils from '@/composables/useUtils';
import { useAuthStore } from '@/stores/auth';
import { useGameStore } from '@/stores/useGameStore';
import { useWalletsStore } from '@/stores/wallet';
import { RouletteItems, TransactionOperation } from '@/types';
import { onUpdated, ref, useTemplateRef } from 'vue';
import { loadScript } from 'vue-plugin-load-script';

const buttonRef = useTemplateRef('buttonRef')
const dialogVisible = defineModel('dialogVisible')
const isSpinFinished = ref(false)

const { wallet } = useAuthStore()
const { calculateRoulettePayout } = useUtils()

onUpdated(async () => {
  await loadScript('/scripts/d3.v5.min.js')
  await loadScript('/scripts/confetti.browser.min.js')
  await loadScript('/scripts/rouletteScript.js')

  const { cumulativeLoseStreakWager, resetCumulativeLoseStreakWager } = useGameStore()

  if (!isSpinFinished.value) {
    window.loadRoulette([
    RouletteItems.Fifty,
    RouletteItems.TwentyFive,
    RouletteItems.OneTwenty,
    RouletteItems.TwentyFive,
    RouletteItems.Fifty,
    RouletteItems.OneHundred,
    RouletteItems.TwentyFive,
    RouletteItems.Fifty,
    RouletteItems.OneHundred,
    RouletteItems.TwentyFive,
  ],
    600,
    600
  )
  }

  buttonRef.value?.addEventListener('click', () => {
    const { createPendingTransaction, commitPendingTransactions } = useWalletsStore()
    let result = window.spinRoulette((_) => {
      commitPendingTransactions(wallet.id)
      isSpinFinished.value = true
      resetCumulativeLoseStreakWager()
    })
    const payout = calculateRoulettePayout(result, cumulativeLoseStreakWager)
    createPendingTransaction(payout, TransactionOperation.Payout, wallet.id)
  })
})



</script>

<style scoped>
#chart {
  height: 100%;
  width: 100%;
}

:deep(.roulette-dialog) {
  background-color: rgba(0, 0, 0, 0);
}

.roulette-title {
  color: white;
}
</style>