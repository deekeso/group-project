<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const router = useRouter()
const authStore = useAuthStore()

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
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo-container">
        <img src="@/assets/Group 27.png" alt="Keno Plus Logo" class="logo" />
      </div>
      <div class="profile-container">
        <el-dropdown>
          <div class="profile-icon">
            <el-icon><User /></el-icon>
          </div>
          <template #dropdown>
            <el-menu>
              <el-menu-item index="1" @click="handleLogout">Logout</el-menu-item>
              <el-menu-item index="2">About</el-menu-item>
            </el-menu>
          </template>
        </el-dropdown>

        <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
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

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 991px) {
  .nav-links {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    background: rgba(6, 3, 81, 0.95);
    flex-direction: column;
    padding: 20px 0;
    gap: 20px;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    backdrop-filter: blur(8px);
  }

  .nav-links-active {
    transform: translateY(0);
  }

  .nav-link {
    font-size: 18px;
    padding: 8px 0;
    position: relative;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
  }

  .nav-links-active .nav-link {
    opacity: 1;
    transform: translateY(0);
  }

  .hamburger span {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 576px) {
  .nav-content {
    padding: 0 20px;
  }

  .search-box {
    display: none;
  }

  .logo {
    height: 120px;
    margin-top: 20px;
  }
}
</style>
