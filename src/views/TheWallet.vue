<template>
  <el-container>
    <el-header>
      <HomeButton @home="directToHome" />
    </el-header>
    <el-main class="wallet-page">
      <el-container class="wallet-box">
        <div class="wallet-header">
          <div class="balance-section">
            <button
              class="back-button"
              v-if="route.query['redirect'] && route.query['redirect'] !== ''"
              title="Return to game"
              @click="router.push({ name: route.query['redirect'] as string })"
            >
              <el-icon size="40" color="white">
                <Back />
              </el-icon>
            </button>
            <div class="wallet-header-text">
              <p>Welcome, {{ user?.firstname }}!</p>
              <h3>Your Current Balance is</h3>
              <h1>₱{{ wallet.balance.toFixed(2) }}</h1>
              <a href="#" class="history-link" @click.prevent="showHistory = true">
                View Transaction History
                <el-icon><ArrowRight /></el-icon>
              </a>
            </div>
          </div>

          <el-radio-group v-model="radio1" size="large" class="tab-toggle" style="min-width: 204px">
            <el-radio-button value="1" class="deposit-tab">Deposit</el-radio-button>
            <el-radio-button value="2" class="withdraw-tab">Withdraw</el-radio-button>
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
              <el-radio-button
                v-for="amount in withdrawAmounts"
                :key="amount.label"
                :label="amount.label"
              >
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

          <el-button class="deposit-btn" type="warning" round @click="confirmDeposit"
            >Deposit</el-button
          >
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
  <el-dialog v-model="confirmExitDialogVisible" title="Exit game?" width="500" align-center>
    <span>
      You're about to go back to the home page. You will lose your progress after exiting. Are you
      sure?
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="confirmExitDialogVisible = false">No, I'll keep playing</el-button>
        <el-button type="primary" @click="router.push('/home')">Yes, take me home</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- Add the drawer -->
  <el-drawer
    v-model="showHistory"
    title="Transaction History"
    direction="rtl"
    :size="drawerWidth"
    class="history-drawer"
  >
    <div class="history-content">
      <div v-for="(transaction, index) in recentTransactions" :key="index" class="transaction-card">
        <div class="transaction-header">
          <div class="transaction-header-left">
            <span class="transaction-type" :class="transaction.operation.toLowerCase()">
              {{ formatOperationType(transaction.operation) }}
            </span>
          </div>

          <span class="transaction-date">
            {{ formatDate(transaction.timestamp) }}
          </span>
        </div>

        <div class="transaction-details">
          <div class="amount-section">
            <div v-if="transaction.metadata?.gameMode" class="game-mode">
              <span>Game Mode:</span>
              <span>{{
                transaction.metadata.gameMode.charAt(0).toUpperCase() +
                transaction.metadata.gameMode.slice(1)
              }}</span>
            </div>
            <div
              v-if="
                transaction.metadata?.purchaseMode &&
                transaction.metadata?.numberOfCards !== undefined
              "
              class="purchase-info"
            >
              <span>Purchase Mode:</span>
              <span>
                {{
                  transaction.metadata.purchaseMode.charAt(0).toUpperCase() +
                  transaction.metadata.purchaseMode.slice(1)
                }}
                - {{ transaction.metadata.numberOfCards }}
                Card/s
              </span>
            </div>
            <div class="final-balance">
              <span>Old Balance:</span>
              <span>₱{{ transaction.oldBalance.toFixed(2) }}</span>
            </div>
            <div class="balance-change">
              <span>Balance Change:</span>
              <span
                :class="{
                  positive: isPositiveOperation(transaction.operation),
                  negative: !isPositiveOperation(transaction.operation),
                }"
              >
                {{ isPositiveOperation(transaction.operation) ? '+' : '-' }}₱{{
                  transaction.amount ? Number(transaction.amount).toFixed(2) : '0.00'
                }}
              </span>
            </div>
            <div class="final-balance">
              <span>Final Balance:</span>
              <span>₱{{ transaction.newBalance.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import HomeButton from '@/components/HomeButton.vue'
import Withdraw from '@/components/Withdraw.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { TransactionOperation } from '@/types'
import { Back, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch, computed, onUnmounted, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { performTransaction, user, wallet } = useAuthStore()

const showConfirmDeposit = ref(false)
const confirmExitDialogVisible = ref(false)
const showHistory = ref(false)
const drawerWidth = ref('40%')

function updateWidth() {
  if (window.innerWidth < 1000) {
    drawerWidth.value = '60%'
  }
  if (window.innerWidth < 700) {
    drawerWidth.value = '100%'
  }
}

// Watch for window resize events
onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const num = ref(20)
const radio1 = ref('1')
const value = ref('')
const radio2 = ref('')
const withdrawAmounts = [
  { label: '20', display: '₱20' },
  { label: '50', display: '₱50' },
  { label: '100', display: '₱100' },
  { label: '200', display: '₱200' },
  { label: '500', display: '₱500' },
  { label: '1000', display: '₱1,000' },
] as const
const options = [
  { value: 'GCash', label: 'GCash' },
  { value: 'Maya', label: 'Maya' },
]

const recentTransactions = computed(() => {
  return wallet.transactions
    .slice()
    .reverse()
    .slice(0, 10)
    .map((transaction) => ({
      ...transaction,
      gameDetails:
        transaction.operation === TransactionOperation.Wage ||
        transaction.operation === TransactionOperation.Payout
          ? JSON.parse(localStorage.getItem('keno-game') || '{}')
          : null,
    }))
})

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
    ElMessage.error('Please select an e-wallet for the payment method.')
    return
  }

  if (!num.value || num.value < 20 || num.value > 500000) {
    ElMessage.error('Please enter an amount between ₱20 and ₱500,000.')
    return
  }

  showConfirmDeposit.value = true
}

function handleConfirmedDeposit() {
  performTransaction(TransactionOperation.Deposit, Number(num.value))
  ElMessage.success('Deposit successful!')
  num.value = 20
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

function formatOperationType(operation: TransactionOperation) {
  switch (operation) {
    case TransactionOperation.Deposit:
      return 'Deposit'
    case TransactionOperation.Withdraw:
      return 'Withdraw'
    case TransactionOperation.Wage:
      return 'Game Wager'
    case TransactionOperation.Payout:
      return 'Game Payout'
    default:
      return operation
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleString()
}

function isPositiveOperation(operation: TransactionOperation) {
  return operation === TransactionOperation.Deposit || operation === TransactionOperation.Payout
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
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.wallet-header-text {
  display: flex;
  flex-direction: column;
}

.history-link {
  color: #f8ab00;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
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
  padding: 0.3rem;
  display: flex;
  flex: 1;
  width: 100%;
  /* Fill available space */
  place-self: start;
  justify-self: end;
  width: 100%;
}

.el-radio-button {
  flex-grow: 1;
}
.el-drawer.rtl {
  background-color: transparent;
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

:deep(.amount-buttons) {
  width: 100%;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

::v-deep(.amount-buttons .el-radio-button__inner) {
  font-size: 16px;
  /* Increase font size */
  line-height: 45px;
  /* Adjust line height */
}

:deep(.amount-buttons .el-radio-button__inner) {
  border-radius: 2rem !important;
  /* or any value like 8px */
  /* optional: spacing inside buttons */
  border: 1px solid #dcdfe6;
  width: 100%;
  padding: 0;
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
  background-color: #f8ab00;
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
  z-index: 1000;
}

.history-drawer {
  background-color: #f8f9fa;
  color: #212529;
}

.history-content {
  padding: 1rem;
}

.transaction-card {
  background: #2f2fd1;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.transaction-header-left {
  display: flex;
  gap: 8px;
}

.transaction-type {
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.transaction-type.deposit {
  background: #4caf50;
}
.transaction-type.withdraw {
  background: #f44336;
}
.transaction-type.wage {
  background: #f44336;
}
.transaction-type.payout {
  background: #4caf50;
}
/* #f8ab00 */
.transaction-date {
  color: #ffffff80;
  font-size: 0.9rem;
}

.numbers-section {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.number-group h4 {
  margin: 0 0 0.5rem 0;
  color: #ffffff80;
  font-size: 0.9rem;
}

.number-balls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.number-ball {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
}

.number-ball.selected {
  background: #f8ab00;
}
.number-ball.matched {
  background: #4caf50;
}
.number-ball.unmatched {
  background: #f44336;
}

.amount-section {
  border-top: 1px solid #ffffff20;
  padding-top: 1rem;
  margin-top: 1rem;
}
.game-mode,
.purchase-info,
.balance-change,
.final-balance {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

:deep(.el-drawer__body) {
  padding: 0;
  overflow-y: auto;
}

/* Extra small devices (phones) */
@media (max-width: 576px) {
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .wallet-header {
    grid-template-columns: 1fr;
  }

  .wallet-header-text {
    align-items: center;
  }

  .tab-toggle {
    grid-row: 1;
    margin-bottom: 20px;
  }

  :deep(.amount-buttons) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
