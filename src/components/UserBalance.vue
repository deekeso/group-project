<template>
  <button class="button-container" @click="$emit('wallet')" :title="`Go to wallet.\nRemaining balance: ₱${balance}`">
    <el-icon size="25" color="black">
      <WalletFilled />
    </el-icon>
    ₱{{ balance }}
  </button>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import { WalletFilled } from '@element-plus/icons-vue'

const wallet = useWalletStore()
const balance = wallet.balance
</script>

<style scoped>
.button-container {
  background: #ffffff;
  border-radius: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  transition: all 100ms;
}
.button-container:hover {
 transform: scale(1.05); 
}
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