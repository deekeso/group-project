<template>
  <button ref="buttonRef">Spin roulette</button>
  <div id="chart">

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, useTemplateRef } from 'vue';
import { loadScript } from 'vue-plugin-load-script';
import { useWalletsStore, type PendingTransaction } from '@/stores/wallet';
import { RouletteItems, TransactionOperation } from '@/types';
import useUtils from '@/composables/useUtils';

const buttonRef = useTemplateRef('buttonRef')

const { wallet } = useAuthStore()
const { calculateRoulettePayout } = useUtils()

onMounted(async () => {
  await loadScript('/scripts/d3.v5.min.js')
  await loadScript('/scripts/confetti.browser.min.js')
  await loadScript('/scripts/rouletteScript.js')

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
  ])

  buttonRef.value?.addEventListener('click', () => {
    const { createPendingTransaction, commitPendingTransactions } = useWalletsStore()
    let result = window.spinRoulette((_) => {
      commitPendingTransactions(wallet.id)
    })
    const payout = calculateRoulettePayout(result, 100)
    createPendingTransaction(payout, TransactionOperation.Payout, wallet.id)

    
    // console.log(wallet.balance)
  })
})

</script>

<style scoped></style>