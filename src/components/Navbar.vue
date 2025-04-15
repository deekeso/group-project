<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-left">
        <div class="logo-container">
          <img src="@/assets/Group 27.png" alt="Keno Plus Logo" class="logo" />
        </div>
        <div class="nav-links" :class="{ 'nav-links-active': isMenuOpen }">
          <a href="#" class="nav-link">HOME</a>
          <a href="#" class="nav-link">ABOUT</a>
          <a href="#" class="nav-link">TICKET</a>
          <a href="#" class="nav-link">WALLET</a>
          <a href="#" class="nav-link">KENO MODE</a>
        </div>
      </div>
      <div class="nav-right">
        <div class="search-box">
          <input type="text" placeholder="Search" class="search-input" />
          <button class="search-btn">
            <el-icon><Search /></el-icon>
          </button>
        </div>
        <div class="profile-icon">
          <el-icon><User /></el-icon>
        </div>
        <button class="hamburger" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
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
  background: url('@/assets/20250410-174331 (2) (1) 1.png') no-repeat center;
  background-size: cover;
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

.nav-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100px;
}

.logo {
  height: 150px;
  width: auto;
  margin-top: 25px;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  font-family: 'Istok Web', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.nav-link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 8px 16px;
  width: 240px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #1E1E1E;
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1E1E1E;
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
  background-color: #FFFFFF;
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