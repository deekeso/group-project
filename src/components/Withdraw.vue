<template>
  <div class="section">
    <label class="section-title">Methods:</label>
    <div class="withdraw-method">
      <el-select v-model="value" placeholder="Select Method" class="select-method">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
    </div>

    <div class="section">
          <label class="section-title">Withdraw Amount</label>
          <el-radio-group v-model="radio2" size="large" class="amount-buttons">
            <el-radio-button label="20">₱20</el-radio-button>
            <el-radio-button label="50">₱50</el-radio-button>
            <el-radio-button label="100">₱100</el-radio-button>
            <el-radio-button label="200">₱200</el-radio-button>
            <el-radio-button label="500">₱500</el-radio-button>
            <el-radio-button label="1000">₱1,000</el-radio-button>
          </el-radio-group>

          <el-input-number
            v-model="num"
            :min="20"
            :max="500000"
            class="custom-input"
            placeholder="Enter amount 20 - 500,000"
          >
            <template #prefix>
              <span>₱</span>
            </template>
          </el-input-number>
        </div>

        <el-button class="withdraw-btn" type="warning" round @click="handleWithdraw">Withdraw</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import { defineEmits } from 'vue'

const emit = defineEmits(['update:show'])
const wallet = useWalletStore()

const num = ref(null)
const radio2 = ref('')
const value = ref('')
const options = [
  { value: 'GCash', label: 'GCash' },
  { value: 'Maya', label: 'Maya' },
]

function handleWithdraw() {
  if (num.value) {
    try {
      wallet.withdraw(Number(num.value))
      num.value = null
      radio2.value = ''
      emit('update:show', false) // switch tab after withdraw
    } catch (e: any) {
      alert(e.message)
    }
  }
}

</script>

<style scoped>
.section {
  margin-top: 1rem;
}

.section-title {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.select-method {
  width: 100%;
}

.withdraw-btn {
   background-color: #f8a100;
  color: black;
  font-weight: bold;
  width: 100%;
  height: 3rem;
  margin-top: 1.5rem;
}
.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-bottom: 1rem;
}

.custom-input {
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  padding: 0.25rem;
}
</style>
