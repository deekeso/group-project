<template>
  <button class="button-container" @click="$emit('home')" title="Go to home page.">
    <el-icon size="25" color="black">
      <HomeFilled />
    </el-icon>
  </button>
</template>

<script lang="ts" setup>
  import { HomeFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.button-container {
  background: #ffffff;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 100ms;
}
.button-container:hover {
 transform: scale(1.05); 
}
</style>
