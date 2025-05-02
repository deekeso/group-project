<template>
  <el-container>
    <el-header>
    <HomeButton @home="directToHome" />
  </el-header>
  <el-main class="wallet-page">
      <el-container class="wallet-box">
        <div class="wallet-header">
          <div class="balance-section">
            <button class="back-button" v-if="route.query['redirect'] && route.query['redirect'] !== ''"
              title="Return to game" @click="router.push({ name: route.query['redirect'] as string })">
              <el-icon size="40" color="white">
                <Back />
              </el-icon>
            </button>
            <div>
              <p>Welcome, {{ auth.user?.username }}!</p>
              <h3>Your Current Balance is</h3>
              <h1>₱{{ wallet.balance.toFixed(2) }}</h1>
            </div>
          </div>

          <el-radio-group v-model="radio1" size="large" class="tab-toggle" style="min-width: 204px;">
            <el-radio-button label="1" class="deposit-tab">Deposit</el-radio-button>
            <el-radio-button label="2" class="withdraw-tab">Withdraw</el-radio-button>
          </el-radio-group>
        </div>

        <!-- Deposit Content -->
        <template v-if="radio1 === '1'">
          <div class="section">
            <label class="section-title">Payment Method</label>
            <el-select v-model="value" placeholder="Select Method" class="select-method">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

          </div>

          <div class="section">
            <label class="section-title">Deposit Amount</label>
            <el-radio-group v-model="radio2" class="amount-buttons">
              <el-radio-button label="20">₱20</el-radio-button>
              <el-radio-button label="50">₱50</el-radio-button>
              <el-radio-button label="100">₱100</el-radio-button>
              <el-radio-button label="200">₱200</el-radio-button>
              <el-radio-button label="500">₱500</el-radio-button>
              <el-radio-button label="1000">₱1,000</el-radio-button>
            </el-radio-group>

            <el-input-number v-model="num" :min="20" :max="500000" class="custom-input"
              placeholder="Enter amount 20 - 500,000">
              <template #prefix>
                <span>₱</span>
              </template>
            </el-input-number>
          </div>

          <el-button class="deposit-btn" type="warning" round @click="confirmDeposit">Deposit</el-button>
          <el-dialog v-model="showConfirmDeposit" title="Confirm Deposit" width="300px" center>
            <span>Are you sure you want to deposit ₱{{ num }} using {{ value }}?</span>
            <template #footer>
              <el-button @click="showConfirmDeposit = false">Cancel</el-button>
              <el-button type="primary" @click="handleConfirmedDeposit">Yes</el-button>
            </template>
          </el-dialog>
        </template>
        <Withdraw v-if="radio1 === '2'" :show="true" @update:show="radio1 = '1'" />
      </el-container>

      <!-- Withdraw Component (Shown if selected) -->

  </el-main>
  </el-container>
  <el-dialog
  v-model="confirmExitDialogVisible"
  title="Exit game?"
  width="500"
  align-center
>
  <span>
    You're about to go back to the home page. You will lose your progress after exiting. Are you sure?
  </span>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="confirmExitDialogVisible = false">No, I'll keep playing</el-button>
      <el-button type="primary" @click="router.push('/home')">Yes, take me home</el-button>
    </div>
  </template>
</el-dialog>

</template>

<script setup lang="ts">
import HomeButton from '@/components/HomeButton.vue'
import Withdraw from '@/components/Withdraw.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'
import { Back } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const wallet = useWalletStore()
const auth = useAuthStore()
const showConfirmDeposit = ref(false)
const confirmExitDialogVisible = ref(false)


const num = ref<number | null>(null)
const radio1 = ref('1')
const value = ref('')
const radio2 = ref('')
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


function confirmDeposit() {
  if (!value.value) {
    ElMessage.error('Please select a payment method.')
    return
  }

  if (!num.value || num.value < 20 || num.value > 500000) {
    ElMessage.error('Please enter an amount between ₱20 and ₱500,000.')
    return
  }

  showConfirmDeposit.value = true
}

function handleConfirmedDeposit() {
  wallet.deposit(Number(num.value))
  ElMessage.success('Deposit successful!')
  num.value = null
  radio2.value = ''
  value.value = ''
  showConfirmDeposit.value = false
}
function directToHome() {
  if (route.query['redirect']) {
    confirmExitDialogVisible.value = true
  } else {
    router.push('/home')
  }
}

</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.wallet-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-size: cover;
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
  align-items: start;
}

.back-button {
  background: none;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  width: 45px;
  height: 45px;
  transition: all 100ms;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-button:hover {
  background: white;
}

.back-button:hover i.el-icon {
  color: blue;
}

.balance-section {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
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
  background-color: #2f2fd1;
  border-radius: 999px;
  padding: 0.30rem;
  display: flex;
  flex: 1;
  width: 100%;
  /* Fill available space */
  max-width: 204px;
}

:deep(.el-radio-group) {
  display: flex;
  flex: 1;
  width: 100%;
}

::v-deep(.deposit-tab .el-radio-button__inner) {
  border-radius: 999px 0 0 999px;
  width: 100%;
  text-align: center;

}

::v-deep(.withdraw-tab .el-radio-button__inner) {
  border-radius: 0 999px 999px 0px;
  width: 100%;
  text-align: center;
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
  gap: 1rem;
  margin-bottom: 1rem;

}

::v-deep(.amount-buttons .el-radio-button__inner) {
  font-size: 16px;
  /* Increase font size */
  height: 56px;
  /* Increase height */
  line-height: 45px;
  /* Adjust line height */

}


:deep(.amount-buttons .el-radio-button__inner) {
  border-radius: 2rem !important;
  /* or any value like 8px */
  padding: 0.4rem 1rem;
  /* optional: spacing inside buttons */
  border: 1px solid #dcdfe6;
  /* optional: add a custom border */
  width: 92px;
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

.el-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  position: fixed;
  top: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
  width: 100%;
}
</style>
