<template>
  <div>
    <h1>Mini Keno Page</h1>
    <div class="grid-paytable-container">
      <MiniGrid />
      <PayTable :selected-cells="0" :matched-cells="0" style="padding-top: 10px;" />
    </div>

    <div class="drawn-numbers">
      <KenoBall v-for="num in drawnNumbers" :key="num" :number="num" />
    </div>

    <el-button @click="startDraw" :disabled="drawnNumbers.length >= 49">Draw Number</el-button>
    <el-button @click="resetDraw" :disabled="isDrawing">Reset</el-button>
  </div>
</template>

<script setup lang="ts">
import KenoBall from '@/components/KenoBall.vue'
import MiniGrid from '@/components/MiniKeno/MiniGrid.vue'
import PayTable from '@/components/PayTable/PayTable.vue'
import { useKenoDraw } from '@/composables/useKenoDraw'
import { ref } from 'vue'

const { drawnNumbers, drawNumber, resetDraw } = useKenoDraw()

const isDrawing = ref(false)

function startDraw() {
  if (isDrawing.value || drawnNumbers.value.length >= 49) return

  isDrawing.value = true
  let count = 0

  const interval = setInterval(() => {
    drawNumber()
    count++

    if (count >= 10 || drawnNumbers.value.length >= 49) {
      clearInterval(interval)
      isDrawing.value = false
    }
  }, 200)
}
</script>

<style scoped>
.drawn-numbers {
  display: flex;
  margin-block: 10px;
}
.grid-paytable-container {
  width: fit-content;
  margin: 0 auto;
}
</style>
