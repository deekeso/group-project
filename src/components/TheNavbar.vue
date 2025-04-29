<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import UserBalance from '@/components/UserBalance.vue'
import { useWalletStore } from '@/stores/wallet'
import SigninForm from '@/components/SigninForm.vue'
import SignupForm from '@/components/SignupForm.vue'
import { User } from '@element-plus/icons-vue'

const walletStore = useWalletStore()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('Are you sure you want to log out?', 'Confirm Logout', {
      confirmButtonText: 'Yes, Log Out',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })

    authStore.logout()
    router.push('/home')
  } catch {
    // User cancelled logout
  }
}
function directToWallet() {
  router.push('/wallet')
}
const isSigninVisible = ref(false)
const isSignupVisible = ref(false)

// Add ref for the signin form
const signinFormRef = ref()

const showSigninModal = () => {
  isSigninVisible.value = true
  isSignupVisible.value = false
}

const showSignupModal = () => {
  isSignupVisible.value = true
  isSigninVisible.value = false
}

const handleLoginClick = () => {
  isSigninVisible.value = true
}

// Handle signin to signup transition
const handleOpenSignup = () => {
  isSigninVisible.value = false
  isSignupVisible.value = true
}

const router = useRouter()
const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo-container">
        <img src="@/assets/Group 27.png" alt="Keno Plus Logo" class="logo" />
      </div>
      <div class="profile-container">
        <div class="userbal-button" v-if="authStore.isAuthenticated">
          <UserBalance @wallet="directToWallet" />
        </div>
        <!-- If authenticated, show the user icon inside el-dropdown -->
        <el-dropdown v-if="authStore.isAuthenticated">
          <div class="profile-icon">
            <el-icon size="large" class="profile-icon">
              <User />
            </el-icon>
          </div>
          <template #dropdown>
            <el-menu>
              <el-menu-item index="1" @click="handleLogout">Logout</el-menu-item>
            </el-menu>
          </template>
        </el-dropdown>
        <el-button v-else class="signin-button" @click="showSigninModal">Sign In</el-button>
      </div>
    </div>
  </nav>

  <el-dialog
    v-model="isSigninVisible"
    style="background-color: transparent"
    center
    @close="signinFormRef?.resetForm()"
  >
    <SigninForm
      ref="signinFormRef"
      @close="isSigninVisible = false"
      @open-signup="handleOpenSignup"
    />
  </el-dialog>

  <el-dialog
    v-model="isSignupVisible"
    style="background-color: transparent"
    center
    @close="signupFormRef?.resetForm()"
  >
    <SignupForm
      ref="signupFormRef"
      @close="isSignupVisible = false"
      @open-signin="
        () => {
          isSignupVisible = false
          isSigninVisible = true
        }
      "
    />
  </el-dialog>
</template>

<style scoped>
.navbar {
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-content {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100px;
  grid-column: 2;
  justify-content: center;
}

.logo {
  height: 150px;
  width: auto;
  margin-top: 25px;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 20px;
  grid-column: 3;
  justify-self: end;
}
.profile-icon {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e1e1e;
}

.signin-button {
  background-color: #f8ab00;
  border: none;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  color: #060351;
  height: 40px;
  width: 100px;
  border-radius: 30px;
}

.userbal-button .button-container {
  width: 150px;
  justify-content: center;
  align-items: center;
  height: 35px;
}

::v-deep(.el-dialog__header) {
  display: none;
}

::v-deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog) {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  max-width: 90vw;
}

:deep(.el-dialog__body) {
  padding: 0;
  overflow: auto;
}
</style>
