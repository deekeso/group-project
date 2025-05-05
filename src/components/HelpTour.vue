<template>
  <el-tour v-model="open" style="color: black">
    <el-tour-step
      v-for="(step, index) in tourSteps"
      :key="index"
      :target="step.target"
      :title="step.title"
      :placement="step.placement"
    >
      <div class="tour-container">
        <img :src="step.img" style="max-width: 130px" />
        <div>{{ step.description }}</div>
      </div>
    </el-tour-step>
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </el-tour>
</template>

<script setup lang="ts">
import { useTour } from '@/composables/useTour'

const { open, tourSteps } = useTour()
</script>

<style scoped>
.tour-container {
  display: flex;
  align-items: center;
  max-width: 100%;
}
</style>
