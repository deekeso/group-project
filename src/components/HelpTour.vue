<script setup lang="ts">
import { useTour } from '@/composables/useTour'

const { open, currentStep, tourSteps, startTour, nextStep } = useTour()
</script>
<template>
  <el-tour v-model="open" style="color: black">
    <el-tour-step
      v-for="(step, index) in tourSteps"
      :key="index"
      :target="step.target"
      :title="step.title"
      :placement="step.placement"
    >
      {{ step.description }}
    </el-tour-step>
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </el-tour>
</template>
