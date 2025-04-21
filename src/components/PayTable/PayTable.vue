<script lang="ts" setup>
  import payTable from "./payTable.json"
  const { selectedCellsCount, matchedCellsCount } = defineProps<{
    selectedCellsCount: number
    matchedCellsCount: number
  }>()
</script>

<template>
  <div v-if="selectedCellsCount > 0" class="pay-table">
    <div class="cells-container">
      <div v-for="n in selectedCellsCount" class="pay-data">
        <div v-if="n <= 6" class="multiplier-cell-tight" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ payTable['mini'][selectedCellsCount - 1][n-1] }}x</el-text>
        </div>
        <div v-else class="multiplier-cell" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ payTable['mini'][selectedCellsCount - 1][n-1] }}x</el-text>
        </div>
        <div v-if="n <= 6" class="selected-count-cell-tight" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ n }}x</el-text>
        </div>
        <div v-else class="selected-count-cell" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ n }}x</el-text>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="pay-table">
    <div class="cells-container">
      <div class="pay-data">
        <div class="placeholder-cell">
          <el-text size="large">Multiplier goes here.</el-text>
        </div>
        <div class="placeholder-cell">
          <el-text size="large">Hit cells goes here.</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .pay-table {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .cells-container {
    width: 100%;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    align-items: center;
  }
  
  .pay-data {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
  }

  .multiplier-cell, .multiplier-cell-tight {
    background-color: #524DE0;
  }
  
  .selected-count-cell, .selected-count-cell-tight {
    background-color: #964DE0;
  }

  .el-text {
    color: white;
    font-weight: 600;
  }

  .multiplier-cell, 
  .selected-count-cell, 
  .multiplier-cell-tight, 
  .selected-count-cell-tight, 
  .placeholder-cell {
    width: 100%;
    padding: 4px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 2px solid rgba(0,0,0,0);
  }

  .hit {
    border: 2px solid greenyellow;
  }

  .multiplier-cell-tight, .selected-count-cell-tight {
    padding: 4px 0;
  }

  .placeholder-cell {
    background-color: #7674a7;
  }

</style>