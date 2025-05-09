<script setup lang="ts">
import SigninForm from '@/components/SigninForm.vue'
import SignupForm from '@/components/SignupForm.vue'
import UserBalance from '@/components/UserBalance.vue'
import { useAuthStore } from '@/stores/auth'
import { User } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserMenuBalance from './UserMenuBalance.vue'

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
const signupFormRef = ref()

const showSigninModal = () => {
  isSigninVisible.value = true
  isSignupVisible.value = false
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
  <el-dialog v-model="isSigninVisible" style="background-color: transparent" center @close="signinFormRef?.resetForm()">
    <SigninForm ref="signinFormRef" @close="isSigninVisible = false" @open-signup="handleOpenSignup" />
  </el-dialog>

  <el-dialog v-model="isSignupVisible" style="background-color: transparent" center @close="signupFormRef?.resetForm()">
    <SignupForm ref="signupFormRef" @close="isSignupVisible = false" @open-signin="
      () => {
        isSignupVisible = false
        isSigninVisible = true
      }
    " />
  </el-dialog>
  <nav class="navbar">
    <div class="nav-content">
      <img src="@/assets/Group 27.png" alt="Keno Plus Logo" class="logo" />
      <div class="profile-container">

        <div class="userbal-button" v-if="authStore.isAuthenticated">
          <UserBalance @wallet="directToWallet" />
        </div>

        <!-- If authenticated, show the user icon inside el-dropdown -->
        <el-dropdown v-if="authStore.isAuthenticated" trigger="click">
          <div class="profile-icon">
            <el-icon size="large" class="profile-icon">
              <User />
            </el-icon>
          </div>

          <template #dropdown>
            <el-dropdown-menu>

              <el-dropdown-item index="1" @click="directToWallet" class="user-menu-balance">
                <UserMenuBalance />
              </el-dropdown-item>

              <el-dropdown-item index="2" @click="handleLogout">Logout</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button v-else class="signin-button" @click="showSigninModal">Sign In</el-button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
  height: auto;
  width: 100%;
  padding: 20px 40px;
}

.nav-content {
  width: 100%;
  max-width: 1440px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 0 auto;
}

.logo {
  grid-column: 2;
  height: 100%;
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
  height: 38px;
}

::v-deep(.el-dropdown-menu__item.user-menu-balance) {
  display: none;
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

/* Extra small devices (phones) */
@media (max-width: 576px) {}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .logo {
    height: 70%;
  }

  .userbal-button {
    display: none;
  }

  ::v-deep(.el-dropdown-menu__item.user-menu-balance) {
    display: block;
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {

  /* Styles for desktops */
  .logo {
    grid-column: 1;
  }
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
