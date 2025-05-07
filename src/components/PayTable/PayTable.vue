<script lang="ts" setup>
import { ref, watch } from 'vue'
import payTable from './payTable.json'

const { selectedCellsCount, matchedCellsCount, kenoType } = defineProps<{
  selectedCellsCount: number
  matchedCellsCount: number
  kenoType: 'mini' | 'classic'
}>()

const payTableData = ref<{ pays: string; hit: string; startIndex: number; endIndex?: number }[]>()

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
  // use spread to copy values array, as we modify the reference later on using splice()
  const values = [...payTable[kenoType][selectedCellsCount - 1]['values']]
  const zeros = payTable[kenoType][selectedCellsCount - 1]['zeros']
  const hits = payTable[kenoType][selectedCellsCount - 1]['hits']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = []

  const numberFormatter = Intl.NumberFormat('en-US', { notation: 'compact' })

  for (let i = 0; i < zeros.length - 1; i++) {
    values.splice(zeros[0], 1) // splice() method modifies the referenced array, that's why we made a copy
  }

  values.forEach((value, index) => {
    result.push({
      pays: value > 999 ? numberFormatter.format(value) : value.toString(),
      hit: hits[index],
    })
  })

  for (let index = 0; index < values.length; index++) {
    if (index === zeros[0]) {
      result[index] = { ...result[index], startIndex: zeros[0], endIndex: zeros[zeros.length - 1] }
    } else {
      if (index < zeros[0]) {
        result[index] = { ...result[index], startIndex: index }
      } else {
        result[index] = { ...result[index], startIndex: index + zeros.length - 1 }
      }
    }
  }

  payTableData.value = result
}

watch(() => [selectedCellsCount, matchedCellsCount], updatePayTableData)

updatePayTableData()
</script>

<template>
  <div v-if="selectedCellsCount > 0" class="pay-table">
    <div class="cells-container">
      <div class="label-container">
        <div class="label" :class="{ verticalText: selectedCellsCount >= 9, smallerText: selectedCellsCount >= 9 }">
          <el-text tag="p" size="large">Pays</el-text>
        </div>
        <div class="label" :class="{ verticalText: selectedCellsCount >= 9, smallerText: selectedCellsCount >= 9 }">
          <el-text tag="p" size="large">Hits</el-text>
        </div>
      </div>
      <div v-for="data in payTableData" class="pay-data" :key="data.hit">
        <!-- PAY CELL -->
        <div v-if="data.endIndex != null" class="multiplier-cell-tight" :class="{
          hit: matchedCellsCount >= data.startIndex && matchedCellsCount <= data.endIndex,
          hide:
            !(matchedCellsCount >= data.startIndex && matchedCellsCount <= data.endIndex) &&
            matchedCellsCount > -1,
          verticalText: selectedCellsCount >= 9,
          smallerText: selectedCellsCount >= 9
        }">
          <el-text size="large">x{{ data.pays }}</el-text>
        </div>
        <div v-else class="multiplier-cell-tight" :class="{
          hit: matchedCellsCount === data.startIndex,
          hide: matchedCellsCount !== data.startIndex && matchedCellsCount > -1,
          verticalText: selectedCellsCount >= 9,
          smallerText: selectedCellsCount >= 9
        }">
          <el-text size="large">x{{ data.pays }}</el-text>
        </div>
        <!-- END OF PAY CELL -->

        <!-- HIT CELL -->
        <div v-if="data.endIndex != null" class="selected-count-cell" :class="{
          hit: matchedCellsCount >= data.startIndex && matchedCellsCount <= data.endIndex,
          hide:
            !(matchedCellsCount >= data.startIndex && matchedCellsCount <= data.endIndex) &&
            matchedCellsCount > -1,
            smallerText: selectedCellsCount >= 9
        }">
          <el-text size="large">{{ data.hit }}</el-text>
        </div>
        <div v-else class="selected-count-cell" :class="{
          hit: matchedCellsCount === data.startIndex,
          hide: matchedCellsCount !== data.startIndex && matchedCellsCount > -1,
          smallerText: selectedCellsCount >= 9
        }">
          <el-text size="large">{{ data.hit }}</el-text>
        </div>
        <!-- END OF HIT CELL -->
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
  height: 100%;
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
  height: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  gap: 10px;
}

.pay-data:hover>.hide {
  opacity: 1;
}

.multiplier-cell-tight {
  background-color: #524de0;
  display: flex;
  justify-content: center;
  align-items: center
}

.selected-count-cell {
  background-color: #964de0;
  display: flex;
  justify-content: center;
  align-items: center
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

.selected-count-cell,
.multiplier-cell-tight,
.placeholder-cell {
  width: 100%;
  height: 100%;
  padding: 4px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0);
  text-align: center;
}

.hit {
  border: 2px solid greenyellow;
  animation: scaleUpDown 300ms ease-in-out;
  /* Adjust duration as needed */
}

.hide {
  opacity: 0.6;
}

.multiplier-cell-tight {
  padding: 4px 0;
}

.placeholder-cell {
  background-color: #7674a7;
}

.el-text {
  color: #ffffff;
  font-weight: bold;
}

/* Extra small devices (phones) */
@media (max-width: 576px) {}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .cells-container {
    height: 120px;
  }

  .selected-count-cell {
    height: fit-content;
  }

  .label {
    height: 100%;
  }

  .smallerText .el-text {
    font-size: 0.8rem;
  }

  .verticalText {
    flex-grow: 1;
  }

  .verticalText .el-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .multiplier-cell-tight,
  .selected-count-cell,
  .placeholder-cell,
  .label {
    padding: 4px 0px;
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}

@keyframes scaleUpDown {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
