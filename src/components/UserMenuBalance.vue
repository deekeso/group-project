<template>
  <el-icon size="large" color="black">
    <WalletFilled />
  </el-icon>
  <span>₱{{ balance }}</span>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { WalletFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'

const { wallet } = useAuthStore()
const balance = computed(() => wallet.balance)
</script>

<style scoped></style>
