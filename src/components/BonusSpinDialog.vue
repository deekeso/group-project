<template>
  <div>
    <el-dialog class="roulette-dialog" v-model="dialogVisible" width="50%" align-center destroy-on-close
      :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
      :z-index="2999">
      <div class="roulette-pin"></div>

      <el-dialog class="result-dialog" @click="resultDialogVisible = false" v-model="resultDialogVisible" align-center destroy-on-close
      :close-on-click-modal="isSpinFinished" :close-on-press-escape="isSpinFinished" :show-close="isSpinFinished"
        :z-index="3000" @closed="onResultClosed">
        <div class="purple-div">
          <div class="result-content">
            <h2>YOU WON</h2>
            <h1>₱{{ count }}</h1>
            <div class="twinkle-container">
              <img src="/src/assets/gold-trunk-win.png" alt="" />
              <div class="twinkle"></div>
            </div>
          </div>
        </div>
      </el-dialog>

      <h1 class="roulette-title">Roulette of Recovery</h1>
      <p>Your lose streak wager: <span class="lose-streak-wager">₱{{ cumulativeLoseStreakWager }}</span></p>
      <p>You have a chance to recover a percentage of your lose streak wager! Spin to start.</p>
      <div class="chart-container">
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
import { storeToRefs } from 'pinia';

const buttonRef = useTemplateRef('buttonRef')
const dialogVisible = defineModel('dialogVisible')
const resultDialogVisible = defineModel('resultDialogVisible')
const isSpinFinished = ref(false)
const spinStarted = ref(false)
const count = ref<number>(0)

const { wallet } = useAuthStore()
const { calculateRoulettePayout } = useUtils()

const {cumulativeLoseStreakWager} = storeToRefs(useGameStore())

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
    const { createPendingTransaction, commitPendingTransactions } = useWalletsStore()

    const result = window.spinRoulette(() => {
      commitPendingTransactions(wallet.id)
      isSpinFinished.value = true
      spinStarted.value = false
      new Audio(confettiSoundEffect).play()
      setTimeout(() => resultDialogVisible.value = true, 2000)
    })
    spinStarted.value = true
    const payout = calculateRoulettePayout(result, cumulativeLoseStreakWager.value)
    startCount(payout)
    createPendingTransaction(payout, TransactionOperation.Payout, wallet.id)
  })
})

function onResultClosed() {
  dialogVisible.value = false
  isSpinFinished.value = false
}

const startCount = (end: number) => {
  const start = count.value
  const duration = 800 // Animation duration in milliseconds
  const startTime = performance.now()

  function update(timestamp: number) {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    count.value = Math.floor(start + (end - start) * progress)
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  requestAnimationFrame(update)
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

:deep(.roulette-pin) {
  position: absolute;
  background-image: url(/src/assets/roulette-pin.svg);
  background-position: center;
  background-size: cover;
  height: 10%;
  width: 12%;
  z-index: 2999;
  top: 180px;
}

.roulette-title,
#spin-button {
  font-family: 'SuperDream', sans-serif;
  font-size: 2rem;
}

.roulette-title {
  font-size: 2rem;
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
  max-width: 650px;
  height: 650px;
  padding: 0;
  background: rgba(0,0,0,0);
}

:deep(.result-dialog header) {
  display: none;
}

:deep(.result-dialog .el-dialog__body) {
  height: 100%;
}

:deep(.purple-div) {
  background-color: #a47cf3;
  width: 100%;
  height: 100%;
  padding: 50px;
  border-radius: 30px;
  -webkit-box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
  -moz-box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
  box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
}

:deep(.result-content) {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(src/assets/game-modals-bg.png);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

:deep(.result-content h1), :deep(.result-content h2) {
  color: #f8ab00;
  text-transform: uppercase;
  font-style: normal;
  text-align: center;
}

:deep(.result-content h2) {
  font-family: 'SuperDream', sans-serif;
  font-size: 3rem;
  line-height: 80px;
}

:deep(.result-content h1) {
  font-weight: 700;
  font-family: 'Mukta Mahee', sans-serif;
  font-size: 6rem;
  line-height: 100px;
}

:deep(.el-overlay-dialog:has(.result-dialog)) {
  padding: 0 40px;
}

:deep(.roulette-dialog) {
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  max-width: 700px;
}

:deep(.roulette-dialog p) {
  color: white;
  font-size: 1.1rem;
  text-align: center;
}

:deep(.lose-streak-wager) {
  color: #f8ab00;
  font-weight: bold;
}

.twinkle-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.twinkle-container img {
  width: 80%;
}

.twinkle {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -10%;
  left: 0%;
  z-index: 1;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 50%);
  opacity: 0;
  animation: twinkle-animation 2s infinite;
}

@keyframes twinkle-animation {
  0%,
  100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.25;
    transform: scale(1.3);
  }
}
</style>
