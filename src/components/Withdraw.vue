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
        <el-radio-button 
           v-for="amount in withdrawAmounts" 
           :key="amount.label"
            :label="amount.label">
         {{ amount.display }}
       </el-radio-button>
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

        <el-button class="withdraw-btn" type="warning" round @click="confirmWithdraw">Withdraw</el-button>

  </div>
  <el-dialog v-model="showConfirmWithdraw" title="Confirm Withdrawal" width="300px" center>
  <span>Are you sure you want to withdraw ₱{{ num }} using {{ value }}?</span>
  <template #footer>
    <el-button @click="showConfirmWithdraw = false">Cancel</el-button>
    <el-button type="primary" @click="handleConfirmedWithdraw">Yes</el-button>
  </template>
</el-dialog>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import { defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
const showConfirmWithdraw = ref(false)




const emit = defineEmits(['update:show'])
const wallet = useWalletStore()

const num = ref(20)
const radio2 = ref('')
const value = ref('')
const withdrawAmounts = [
  { label: '20', display: '₱20' },
  { label: '50', display: '₱50' },
  { label: '100', display: '₱100' },
  { label: '200', display: '₱200' },
  { label: '500', display: '₱500' },
  { label: '1000', display: '₱1,000' }
] as const
const options = [
  { value: 'GCash', label: 'GCash' },
  { value: 'Maya', label: 'Maya' },
]

watch(radio2, (val) => {
  if (val) {
    num.value = Number(val)
  }
})

watch(num, (val) => {
  const predefinedAmounts = ['20', '50', '100', '200', '500', '1000']
  if (!predefinedAmounts.includes(String(val))) {
    radio2.value = ''
  }
})



function confirmWithdraw() {
  if (!value.value) {
    ElMessage.error('Please select an e-wallet for the withdrawal.')
    return
  }

  if (!num.value || num.value < 20 || num.value > 500000) {
    ElMessage.error('Please enter an amount between ₱20 and ₱500,000.')
    return
  }

  showConfirmWithdraw.value = true
}

function handleConfirmedWithdraw() {
  try {
    wallet.withdraw(Number(num.value))
    ElMessage.success('Withdrawal successful!')
    num.value = 20
    radio2.value = ''
    value.value = ''
    showConfirmWithdraw.value = false
    emit('update:show', false)
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('An error occurred during withdrawal')
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
  margin-bottom: 2rem;
}

.withdraw-btn {
   background-color: #F8AB00;
  color: black;
  font-weight: bold;
  width: 100%;
  height: 3rem;
  margin-top: 1.5rem;
}
.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.custom-input {
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
}
</style>
