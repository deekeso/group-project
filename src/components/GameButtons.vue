<template>
  <div class="btn-container">
    <button
      @click="halfWager"
      class="yellow-btn btn"
      :disabled="isDrawing || wager <= gameStore.MIN_WAGER"
    >
      ÷2
    </button>
    <div class="wager-container" :class="{ disabled: isDrawing }">
      <button
        class="wager-btn"
        @click="gameStore.decreaseWager"
        :disabled="isDrawing || wager <= gameStore.MIN_WAGER"
        @mousedown="startDecreaseHold"
        @touchstart="startDecreaseHold"
        @mouseup="stopDecreaseHold"
        @touchend="stopDecreaseHold"
        @mouseleave="stopDecreaseHold"
      >
        <el-icon size="large" color="black">
          <Minus />
        </el-icon>
      </button>
      <input
        type="range"
        v-model="wager"
        :min="gameStore.MIN_WAGER"
        :max="gameStore.MAX_WAGER"
        :step="1"
        :disabled="isDrawing"
      />

      <span class="wager-txt"> Wager: ₱{{ wager }}</span>

      <button
        class="wager-btn"
        @click="gameStore.increaseWager"
        :disabled="isDrawing || wager >= gameStore.MAX_WAGER"
        @mousedown="startIncreaseHold"
        @touchstart="startIncreaseHold"
        @mouseup="stopIncreaseHold"
        @touchend="stopIncreaseHold"
        @mouseleave="stopIncreaseHold"
      >
        <el-icon size="large" color="black">
          <Plus />
        </el-icon>
      </button>
    </div>
    <!-- <el-text class="yellow-btn btn">x{{ bet }}</el-text> -->

    <button
      @click="doubleWager"
      class="yellow-btn btn"
      :disabled="isDrawing || wager >= gameStore.MAX_WAGER"
    >
      ×2
    </button>
    <button @click="$emit('playGame')" class="yellow-btn btn" :disabled="isDrawing || disabled">
      Play
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'

const gameStore = useGameStore()
const { wager } = storeToRefs(gameStore)

const { gameIsDrawing } = defineProps<{
  gameIsDrawing: boolean
  disabled: boolean
}>()
const isDrawing = ref(gameIsDrawing)

watch(
  () => gameIsDrawing,
  () => {
    isDrawing.value = gameIsDrawing
  },
)

let holdDecreaseTimeout: number
let repeatDecreaseInterval: number
let holdIncreaseTimeout: number
let repeatIncreaseInterval: number

const BUTTON_HOLD_THRESHOLD = 500
const BASE_HOLD_INTERVAL = 100
const MIN_INTERVAL = 1 // Prevent too fast execution
let multiplier = 1

function startDecreaseHold() {
  if (gameStore.wager <= 20) return

  holdDecreaseTimeout = setTimeout(() => {
    repeatDecreaseInterval = setInterval(runDecrease, BASE_HOLD_INTERVAL)
  }, BUTTON_HOLD_THRESHOLD)
}

function runDecrease() {
  if (gameStore.wager <= 20) {
    stopDecreaseHold()
    return
  }

  gameStore.decreaseWager()
  multiplier *= 0.9

  clearInterval(repeatDecreaseInterval)
  repeatDecreaseInterval = setInterval(
    runDecrease,
    Math.max(MIN_INTERVAL, BASE_HOLD_INTERVAL * multiplier),
  )
}

function stopDecreaseHold() {
  clearTimeout(holdDecreaseTimeout)
  clearInterval(repeatDecreaseInterval)
  multiplier = 1
}

function startIncreaseHold() {
  if (gameStore.wager >= 500) return

  holdIncreaseTimeout = setTimeout(() => {
    repeatIncreaseInterval = setInterval(runIncrease, BASE_HOLD_INTERVAL)
  }, BUTTON_HOLD_THRESHOLD)
}

function runIncrease() {
  if (gameStore.wager >= 500) {
    stopIncreaseHold()
    return
  }

  gameStore.increaseWager()
  multiplier *= 0.9

  clearInterval(repeatIncreaseInterval)
  repeatIncreaseInterval = setInterval(
    runIncrease,
    Math.max(MIN_INTERVAL, BASE_HOLD_INTERVAL * multiplier),
  )
}

function stopIncreaseHold() {
  clearTimeout(holdIncreaseTimeout)
  clearInterval(repeatIncreaseInterval)
  multiplier = 1
}

function doubleWager() {
  gameStore.doubleWager()
}

function halfWager() {
  gameStore.halfWager()
}
</script>

<style scoped>
* {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.btn-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr 2fr;
  margin-top: 10px;
  gap: 5px;
}

.btn {
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  border-radius: 100px;
  padding-block: 0.5rem;
  user-select: none;
  cursor: pointer;
}

.btn,
.wager-container,
.wager-btn {
  transition:
    transform 100ms,
    transform 100ms,
    opacity 1000ms,
    background 100ms;
}

.btn:disabled,
.disabled {
  opacity: 0.7;
}

.btn:disabled:hover,
.wager-btn:disabled:hover {
  cursor: not-allowed;
}

.yellow-btn {
  background: #f8ab00;
  color: #050505;
  border: 4px solid #ffe387;
  padding-inline: 20px;
}

.yellow-btn {
  background: #f8ab00;
  color: #050505;
  border: 4px solid #ffe387;
  padding-inline: 20px;
}

.wager-container {
  background: #f8ab00;
  color: #050505;
  font-weight: bolder;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 4px solid #ffe387;
  position: relative;
}

.wager-btn {
  background: #f8ab00;
  border: none;
  padding-inline: 15px;
  height: 100%;
  font-weight: bold;
  align-content: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wager-btn:enabled:hover,
.btn:enabled:hover {
  background: #ffe387;
}

.btn:enabled:hover:active {
  transform: translateY(2px);
  background-color: #ffedc8;
}

.wager-btn:enabled:hover:active {
  background: #ffedc8;
}

.wager-btn,
.wager-txt {
  font-size: 1.2rem;
  font-weight: 550;
  user-select: none;
}
.wager-txt {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  pointer-events: none;
}

.wager-icon {
  fill: black;
  height: 1.2rem;
}
input[type='range'] {
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 300px;
  border-radius: 0; /* iOS */
  flex: 1;
}
::-webkit-slider-runnable-track {
  background: #f8ab00;
}
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0px;
  height: 40px;
  box-shadow: -300px 0 0 300px #c28400;
  border: 4px solid white;
}

/* Extra small devices (phones) */
@media (max-width: 576px) {
  .btn-container {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
  }
  .wager-container {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 4;
  }
}

/* Small devices (tablets) */
@media (max-width: 768px) {
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
