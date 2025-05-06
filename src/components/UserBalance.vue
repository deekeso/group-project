<template>
  <button
    class="button-container wallet-btn"
    @click="$emit('wallet')"
    :title="`Go to wallet.\nRemaining balance: ₱${balance}`"
  >
    <el-icon size="40" color="black">
      <WalletFilled />
    </el-icon>
    <span class="balance-txt">₱{{ balance }}</span>
  </button>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import { WalletFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'

const wallet = useWalletStore()
const balance = computed(() => wallet.balance)
</script>

<style scoped>
.button-container {
  background: #f8ab00;
  border-radius: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
  font-weight: 700;
}
</style>
