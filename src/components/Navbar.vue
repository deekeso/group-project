<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import UserBalance from '@/components/UserBalance.vue'
import { useWalletStore } from '@/stores/wallet'
import SigninForm from '@/components/SigninForm.vue'
import SignupForm from '@/components/SignupForm.vue'
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

const showSigninModal = () => {
  isSigninVisible.value = true
  isSignupVisible.value = false
}

const showSignupModal = () => {
  isSignupVisible.value = true
  isSigninVisible.value = false
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
        <el-dropdown >
          <div class="profile-icon">
            <el-icon><User /></el-icon>
          </div>
          <template #dropdown>
            <el-menu>
              <el-menu-item index="1" @click="handleLogout" v-if="authStore.isAuthenticated">Logout</el-menu-item>
              <el-menu-item index="2">Login</el-menu-item>
            </el-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
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
}

.userbal-button .button-container{
  width: 150px;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 35px;
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
</style>
