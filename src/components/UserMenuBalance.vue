<template>
  <el-icon size="large" color="black">
    <WalletFilled />
  </el-icon>
  <span>₱{{ balance }}</span>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import { WalletFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'

const wallet = useWalletStore()
const balance = computed(() => wallet.balance)
</script>

<style scoped></style>
