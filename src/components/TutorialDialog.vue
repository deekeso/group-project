<template>
  <div>
    <el-dialog v-model="dialogVisible" class="help-dialog" align-center>
      <el-space direction="vertical">
        <TheLegend />
      </el-space>
      <template #footer>
        <div class="dialog-footer">
          <el-space alignment="flex-end" :size="10" wrap>
            <el-button @click="tour" :icon="Opportunity">Walk Me Through</el-button>
            <el-button type="primary" @click="dialogVisible = false"> Continue to game </el-button>
          </el-space>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import TheLegend from './TheLegend.vue'
import { Opportunity } from '@element-plus/icons-vue'
import { useTour } from '@/composables/useTour'

const dialogVisible = defineModel('dialogVisible')
const { startTour } = useTour()

const tour = () => {
  startTour()
  dialogVisible.value = false
}
</script>

<style scoped>
:deep(.help-dialog) {
  background-color: #bcb1ec;
  --el-dialog-width: 100%;
  max-width: 650px;
}

:deep(.el-overlay-dialog:has(.help-dialog)) {
  padding: 0 40px;
}
</style>
