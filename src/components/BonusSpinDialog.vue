<template>
  <div>
    <el-dialog class="roulette-dialog" v-model="dialogVisible" width="50%" align-center destroy-on-close
      :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
      :z-index="2999">


      <el-dialog class="result-dialog" v-model="resultDialogVisible" align-center destroy-on-close
        :close-on-click-modal="isSpinFinished" :close-on-press-escape="isSpinFinished" :show-close="isSpinFinished"
        :z-index="3000" @closed="onResultClosed">
        <div>wow</div>
      </el-dialog>

      <div class="chart-container">
        <h1 class="roulette-title">Roulette of Recovery</h1>
        <button id="spin-button" class="btn-grad" ref="buttonRef" :disabled="spinStarted || isSpinFinished">
          <span :class="{ hideSpinText: spinStarted || isSpinFinished }">Spin!</span>
        </button>
        <div id="chart">
        </div>
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
import confettiSoundEffect from '@/assets/sounds/confetti.wav'

const buttonRef = useTemplateRef('buttonRef')
const dialogVisible = defineModel('dialogVisible')
const resultDialogVisible = defineModel('resultDialogVisible')
const isSpinFinished = ref(false)
const spinStarted = ref(false)

const { wallet } = useAuthStore()
const { calculateRoulettePayout } = useUtils()

onUpdated(async () => {
  await loadScript('/scripts/d3.v5.min.js')
  await loadScript('/scripts/confetti.browser.min.js')
  await loadScript('/scripts/rouletteScript.js')


  if (!isSpinFinished.value && dialogVisible.value) {
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
      500,
      500
    )
  }

  buttonRef.value?.addEventListener('click', () => {
    const { cumulativeLoseStreakWager, resetCumulativeLoseStreakWager } = useGameStore()
    const { createPendingTransaction, commitPendingTransactions } = useWalletsStore()

    const result = window.spinRoulette(() => {
      commitPendingTransactions(wallet.id)
      isSpinFinished.value = true
      spinStarted.value = false
      resetCumulativeLoseStreakWager()
      new Audio(confettiSoundEffect).play()
      resultDialogVisible.value = true
    })
    spinStarted.value = true
    const payout = calculateRoulettePayout(result, cumulativeLoseStreakWager)
    createPendingTransaction(payout, TransactionOperation.Payout, wallet.id)
  })
})

function onResultClosed() {
  dialogVisible.value = false
  isSpinFinished.value = false
}


</script>

<style scoped>
#chart,
.chart-container {
  height: 100%;
  width: 100%;
}

.chart-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.roulette-title {
  position: absolute;
  top: -10%;
}

.roulette-title,
#spin-button {
  font-family: 'SuperDream', sans-serif;
  font-size: 2rem;
}

.roulette-title {
  color: white;
}

#spin-button {
  position: absolute;
  height: 25%;
  width: 25%;
  z-index: 2998;
  color: yellow;
  background-color: red;
  border: none;
  border-radius: 9999px;
  transition: all 50ms;
}

#spin-button:enabled:active {
  background-color: green;
  transform: scale(0.9);
}

#spin-button:enabled {
  cursor: pointer;
}

#spin-button span {
  transition: all 300ms;
}

.hideSpinText {
  opacity: 0;
}

.btn-grad {
  background-image: linear-gradient(to right, #FF8008 0%, #FFC837 51%, #FF8008 100%)
}

.btn-grad {
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
}

.btn-grad:enabled:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

:deep(.result-dialog) {
  width: 100%;
  max-width: 500px;
}

:deep(.el-overlay-dialog:has(.result-dialog)) {
  padding: 0 40px;
}

:deep(.roulette-dialog) {
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  max-width: 700px;
}
</style>
