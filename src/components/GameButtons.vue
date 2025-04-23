<template>
  <div class="btn-container">
    <el-text class="yellow-btn btn">₱{{ balance }}</el-text>
    <el-text class="yellow-btn btn">₱{{ wager }}</el-text>
    <el-text class="blue-btn btn">Auto Pick</el-text>
    <el-text class="blue-btn btn" @click="gameStore.resetGame">Clear</el-text>
    <el-text class="yellow-btn btn" @click="$emit('playGame')">Play</el-text>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { useWalletStore } from '@/stores/wallet'
import { ref } from 'vue'

const gameStore = useGameStore()
const wallet = useWalletStore()
const wager = ref(0)
const balance = wallet.balance
</script>

<style scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-block: 10px;
}
.btn {
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  border-radius: 20px;
  flex: 1;
  padding-block: 0.5rem;
}

.yellow-btn {
  background: #f8ab00;
  color: #050505;
  border: 4px solid #ffe387;
}
.blue-btn {
  background: #060041;
  color: #f2c534;
  border: 4px solid #7540c1;
}
</style>
