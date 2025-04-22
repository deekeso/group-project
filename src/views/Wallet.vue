<template>
  <div class="wallet-page">
    <el-container class="wallet-box">
      <div class="wallet-header">
      <div class="balance-section">
        <h3>My Balance</h3>
        <!-- <h1>₱{{ wallet.balance.toFixed(2) }}</h1> -->
        <h1>₱23,000</h1>
      </div>

      <el-radio-group v-model="radio1" size="large" class="tab-toggle" style="width: 200px;">
        <el-radio-button label="1" class="deposit-tab">Deposit</el-radio-button>
        <el-radio-button label="2" class="withdraw-tab">Withdraw</el-radio-button>
      </el-radio-group>
    </div>

      <!-- Deposit Content -->
      <template v-if="radio1 === '1'">
        <div class="section">
          <label class="section-title">Payment Method</label>
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
          <label class="section-title">Deposit Amount</label>
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

        <el-button class="deposit-btn" type="warning" round @click="handleDeposit">Deposit</el-button>
      </template>
      <Withdraw v-if="radio1 === '2'" :show="true" @update:show="radio1 = '1'" />
    </el-container>

    <!-- Withdraw Component (Shown if selected) -->

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Withdraw from '@/components/Withdraw.vue'
import { useWalletStore } from '@/stores/wallet'
const wallet = useWalletStore()

const num = ref(null)
const radio1 = ref('1')
const value = ref('')
const radio2 = ref('')
const options = [
  { value: 'GCash', label: 'GCash' },
  { value: 'Maya', label: 'Maya' },
]

function handleDeposit() {
  if (num.value) {
    wallet.deposit(Number(num.value))
    num.value = null
    radio2.value = ''
  }
}

</script>

<style scoped>
.wallet-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/src/assets/Menu\ Background.png') no-repeat center center;
  background-size: cover;
  min-height: 100dvh;
  padding: 2rem;
}

.wallet-box {
  background-color: #2f2fd1;
  color: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.wallet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-section {
  text-align: left;
}

.balance-section h3 {
  margin: 0;
  font-size: 1.2rem;
}

.balance-section h1 {
  font-size: 2.5rem;
  margin-top: 0.5rem;
}

.tab-toggle {
  margin: 1rem 0;
  background-color: #2f2fd1;
  border-radius: 999px;
  padding: 0.30rem;
}

::v-deep(.deposit-tab .el-radio-button__inner) {
  border-radius: 999px 0 0 999px;

}

::v-deep(.withdraw-tab .el-radio-button__inner) {
  border-radius: 0 999px 999px 0px;
}


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

:deep(.select-method .el-select__wrapper) {
  border-radius: 1rem;
}

.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap:2.5rem;
  margin-bottom: 1rem;

}

:deep(.amount-buttons .el-radio-button__inner) {
  border-radius: 1rem !important; /* or any value like 8px */
  padding: 0.5rem 1.25rem; /* optional: spacing inside buttons */
  border: 1px solid #dcdfe6; /* optional: add a custom border */
}

.custom-input {
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  padding: 0.25rem;
}

::v-deep(.custom-input .el-input-number__increase),
::v-deep(.custom-input .el-input-number__decrease) {
  border-radius: 1rem;
}


.deposit-btn {
  background-color: #F8AB00;
  color: black;
  font-weight: bold;
  width: 100%;
  height: 3rem;
  margin-top: 1.5rem;
}
</style>

