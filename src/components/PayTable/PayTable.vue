<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import payTable from './payTable.json'

const { selectedCellsCount, matchedCellsCount, kenoType } = defineProps<{
  selectedCellsCount: number
  matchedCellsCount: number
  kenoType: 'mini' | 'classic'
}>()

const payTableData = ref<{pays: string, hit: string, startIndex: number}[]>()


/* TODO: convert payTable.json to contain only the values
 * and have this function do the processing:
 * find zero indices,
 * automatically generate the hit labels
 * i.e.
 * const values = payTable[kenoType][selectedCellsCount - 1]['values']
 * const zeros = findZeros(values)
 * const hits = generateHitLabels(values)
*/

function updatePayTableData() {
  if (selectedCellsCount < 1) {
      return
    }
    const values = payTable[kenoType][selectedCellsCount - 1]['values']
    const zeros = payTable[kenoType][selectedCellsCount - 1]['zeros']
    const hits = payTable[kenoType][selectedCellsCount - 1]['hits']

    console.log(Array.from(new Set(values)).length === hits.length)

    let result: any[] = []

    const numberFormatter = Intl.NumberFormat("en-US", { notation: "compact" })

    Array.from(new Set(values)).forEach((value, index) => {
      result.push({
        pays: value > 999 ? numberFormatter.format(value) : value.toString(),
        hit: hits[index],
      })
    })

    for (let index = 0; index < values.length - zeros.length + 1; index++) {
      if (index === zeros[0]) {
        result[index] = {...result[index], startIndex: zeros[0]}
      } else {
        if (index < zeros[0]) {
          result[index] = {...result[index], startIndex: index}
        } else {
          result[index] = {...result[index], startIndex: index + zeros.length - 1}
        }
      }
    }

    payTableData.value = result
}

watch(
  () => selectedCellsCount,
  updatePayTableData
)

updatePayTableData()

</script>

<template>
  <div v-if="selectedCellsCount > 0" class="pay-table">
    

    <div class="cells-container">
      <div class="label-container">
        <div class="label">
          <el-text tag="p" size="large">Pays</el-text>
        </div>
        <div class="label">
          <el-text tag="p" size="large">Hits</el-text>
        </div>
      </div>
      <div v-for="data in payTableData" class="pay-data">
        <div 
          class="multiplier-cell-tight" 
          :class="{ hit: matchedCellsCount >= data.startIndex }">
          <el-text size="large">{{ data.pays }}</el-text>
        </div>
        <div 
        class="selected-count-cell"
        :class="{ hit: matchedCellsCount >= data.startIndex }"
        >
          <el-text size="large">{{ data.hit }}</el-text>
        </div>

      </div>

    
    </div>
  </div>

  <div v-else class="pay-table">
    <div class="cells-container">
      <div class="label-container">
        <div class="label">
          <el-text tag="p" size="large">Pays</el-text>
        </div>
        <div class="label">
          <el-text tag="p" size="large">Hits</el-text>
        </div>
      </div>
      <div class="pay-data">
        <div class="placeholder-cell">
          <el-text size="large">:-)</el-text>
        </div>
        <div class="placeholder-cell">
          <el-text size="large">&nbsp;</el-text>
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

.label-container {
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

.multiplier-cell,
.multiplier-cell-tight {
  background-color: #524de0;
}

.selected-count-cell,
.selected-count-cell-tight {
  background-color: #964de0;
}

.label {
  padding: 4px 0px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 8px;
  text-align: end;
  border: 2px solid rgba(0, 0, 0, 0);
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
  border: 2px solid rgba(0, 0, 0, 0);
  text-align: center;
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
  border: 2px solid rgba(0, 0, 0, 0);
}

.hit {
  border: 2px solid greenyellow;
}

.multiplier-cell-tight,
.selected-count-cell-tight {
  padding: 4px 0;
}

.placeholder-cell {
  background-color: #7674a7;
}
.el-text {
  color: #ffffff;
  font-weight: bold;
}
</style>
