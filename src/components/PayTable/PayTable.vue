<script lang="ts" setup>
import payTable from "./payTable.json"
  
  const { selectedCellsCount, matchedCellsCount, kenoType } = defineProps<{
    selectedCellsCount: number
    matchedCellsCount: number
    kenoType: 'mini' | 'classic'
  }>()

  // PROTOTYPE FOR CONTIGUOUS ZERO
  // function findContiguousZeros(arr: number[]) {
  //   let result = [];
  //   let start = -1;

  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] === 0 && start === -1) {
  //       // Mark the start of a zero sequence
  //       start = i;
  //     } else if (arr[i] !== 0 && start !== -1) {
  //       // Mark the end of a zero sequence
  //       result.push([start, i - 1]);
  //       start = -1;
  //     }
  //   }

  //   // Handle the case where the array ends with zeros
  //   if (start !== -1) {
  //     result.push([start, arr.length - 1]);
  //   }

    
  //   return result[0];
  // }

  // const zeroIndices = ref<number[]>([])
  // watch(
  //   () => selectedCellsCount,
  //   (newCount) => {
  //     const [start, end] = findContiguousZeros(payTable[kenoType][newCount-1]);

  //     let indices: number[] = [];
  //     for (let i = start; i <= end; i++) {
  //       indices.push(i);
  //     }

  //     zeroIndices.value = indices; // Update zeroIndices
  //   },
  //   { immediate: true }
  // )



</script>

<template>
  <div v-if="selectedCellsCount > 0" class="pay-table">
    <div class="label-container">
      <div class="label">
        <el-text tag="p" size="large">Multiplier</el-text>
      </div>
      <div class="label">
        <el-text tag="p" size="large">Hits</el-text>
      </div>
    </div>
    
    <div class="cells-container">
      <div v-for="n in selectedCellsCount + 1" class="pay-data">

        <div class="multiplier-cell-tight" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ payTable[kenoType][selectedCellsCount - 1][n-1] }}</el-text>
        </div>

        
        <div class="selected-count-cell-tight" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ n-1 }}</el-text>
        </div>
        
        <!-- <div v-else class="multiplier-cell" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ payTable[kenoType][selectedCellsCount - 1][n-1] }}</el-text>
        </div>
        <div v-else class="selected-count-cell" :class="{ hit: matchedCellsCount >= n}">
          <el-text size="large">{{ n-1 }} hit</el-text>
        </div> -->

      </div>

      <!-- PROTOTYPE FOR CONTIGUOUS ZEROS -->
      <!-- <div v-for="indices in zeroIndices" :key="indices">
        {{ indices }}
      </div> -->
      <!-- Elements before zeroIndices -->
      <!-- <div
        v-for="n in zeroIndices[0] > 0 ? Array.from({ length: zeroIndices[0] }, (_, i) => i + 1) : []"
        :key="n"
        class="pay-data"
      >
        <div class="multiplier-cell">
          <el-text size="large">{{ payTable[kenoType][selectedCellsCount - 1][n - 1] }}x</el-text>
        </div>
        <div class="selected-count-cell">
          <el-text size="large">{{ n - 1 }}</el-text>
        </div>
      </div> -->

      <!-- Single element for all zeroIndices -->
      <!-- <div v-if="zeroIndices.length > 0" class="pay-data">
        <div class="multiplier-cell">
          <el-text size="large">0x</el-text>
        </div>
        <div v-if="zeroIndices[0]===zeroIndices[zeroIndices.length-1]" class="selected-count-cell">
          <el-text size="large">0</el-text>
        </div>
        <div v-else="zeroIndices[0]===zeroIndices[zeroIndices.length]-1" class="selected-count-cell">
          <el-text size="large">{{ zeroIndices[0] }}:{{ zeroIndices[zeroIndices.length - 1] }}</el-text>
        </div>
      </div> -->

      <!-- Elements after zeroIndices -->
      <!-- <div
        v-for="n in zeroIndices.length > 0
          ? Array.from({ length: selectedCellsCount - zeroIndices[zeroIndices.length - 1] }, (_, i) =>
              zeroIndices[zeroIndices.length - 1] + i + 1
            )
          : []"
        :key="n"
        class="pay-data"
      >
        <div class="multiplier-cell" :class="{ hit: matchedCellsCount >= n }">
          <el-text size="large">{{ payTable[kenoType][selectedCellsCount - 1][n - 1] }}x</el-text>
        </div>
        <div class="selected-count-cell" :class="{ hit: matchedCellsCount >= n }">
          <el-text size="large">{{ n - 1 }}</el-text>
        </div>
      </div> -->

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
    position: relative;
  }
  
  .label-container {
    position: absolute;
    bottom: 0;
    left: -80px;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
  }

  .cells-container {
    width: 100%;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    align-items: start;
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

  .label {
    padding: 4px 0px;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    border-radius: 8px;
    text-align: end;
    border: 2px solid rgba(0,0,0,0);
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
    text-align: center;
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