<template>
  <div class="btn-container">
    <div class="wager-container">
      <div class="wager-btn" @click="gameStore.decreaseWager">
        <svg class="wager-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"></path>
        </svg>
      </div>
      <span class="wager-txt">{{ wager }}</span>
      <div class="wager-btn" @click="gameStore.increaseWager">
        <svg class="wager-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
          ></path>
        </svg>
      </div>
    </div>
    <el-text class="yellow-btn btn">x{{ bet }}</el-text>
    <el-text class="yellow-btn btn play-btn" @click="$emit('playGame')">Play</el-text>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { wager, bet } = storeToRefs(gameStore)
</script>

<style scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 10px;
  gap: 5px;
}
.btn {
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  border-radius: 100px;
  padding-block: 0.5rem;
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
  flex: 1;
  padding-block: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.wager-btn {
  background: #f8ab00;
  border: none;
  padding-inline: 20px;
  height: 100%;
  font-weight: bold;
  align-content: center;
}
.wager-btn:hover {
  background: #ffb619;
}
.wager-btn,
.wager-txt {
  font-size: 1.2rem;
  font-weight: 550;
}
.wager-icon {
  fill: black;
  height: 1.2rem;
}
</style>
