<template>
  <div>
    <h1>Mini Keno Page</h1>
    <MiniGrid />
    <el-button>Draw</el-button>
    <el-text>{{ drawNumber }}</el-text>
  </div>
</template>

<script setup lang="ts">
import MiniGrid from '@/components/MiniKeno/MiniGrid.vue'
</script>

<style scoped></style>
s
