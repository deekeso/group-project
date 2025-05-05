<template>
  <div></div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

ElMessage({
  message: "No luck this round. Let's go again!",
  type: 'error',
  plain: true,
})
</script>
