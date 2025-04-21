<script lang="ts" setup>
  import payTable from "./payTable.json"
  const { selectedCells, matchedCells } = defineProps<{
    selectedCells: number
    matchedCells: number
  }>()
</script>

<template>
  <div v-if="selectedCells > 0" class="pay-table">
    <div>kjllkjl;</div>
  </div>
  <div v-else class="pay-table">
    <div class="cells-container">
      <div class="pay-data">
        <div class="multiplier-cell">
          <el-text size="large">500,000x</el-text>
        </div>
        <div class="selected-count-cell">
          <el-text size="large">15</el-text>
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

  .multiplier-cell {
    background-color: #524DE0;
  }
  
  .selected-count-cell {
    background-color: #964DE0;
  }

  .el-text {
    color: white;
    font-weight: 600;
  }

  .multiplier-cell, .selected-count-cell {
    width: 100%;
    padding: 4px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

</style>