<template>
  <div class="user-balance">
    <img src="../assets/iconoir_wallet.png" alt="wallet icon" />
    <el-text class="balance-txt">₱{{ balance }}</el-text>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const balance = wallet.balance
</script>

<style scoped>
.user-balance {
  background: #ffffff;
  color: black;
  width: fit-content;
  padding: 15px;
  border-radius: 100px;
  align-content: center;
}
.balance-txt {
  color: black;
  font-size: 1.2rem;
  margin-left: 20px;
}
</style>
