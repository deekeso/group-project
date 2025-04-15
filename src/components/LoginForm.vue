<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { FormRules } from 'element-plus'
import Navbar from './Navbar.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { useSuccessModal } from '@/composables/useSuccessModal'

const router = useRouter()
const authStore = useAuthStore()
const { formRef, loading, validateForm } = useFormValidation()
const { showSuccessModal } = useSuccessModal()

const form = reactive({
  email: '',
  password: ''
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
    { min: 1, message: 'Email cannot be empty spaces', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    { pattern: /\S/, message: 'Password cannot be empty spaces', trigger: 'blur' }
  ]
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  if (loading.value) return

  loading.value = true
  
  try {
    const isValid = await validateForm()
    if (!isValid) {
      ElMessage.error('Please check your input')
      return
    }
    
    await authStore.login(form.email, form.password)
    
    await showSuccessModal(
      'Login Successful',
      'Welcome back to Keno Plus!'
    )
    
    // Get redirect path from query or default to home
    const redirect = router.currentRoute.value.query.redirect as string || '/home'
    router.push(redirect)
  } catch (error: any) {
    ElMessage.error(error.message || 'An error occurred during login')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <Navbar />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="login-section">
          <h1 class="title">
            <img src="@/assets/ChatGPT_Image_Apr_13__2025__12_28_24_PM-removebg-preview 1.png" alt="Unleash Your Inner Keno Master" />
          </h1>
          
          <div class="form-container">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              class="login-form"
              @submit.prevent="handleSubmit"
            >
              <div class="form-group">
                <label>Email</label>
                <el-form-item prop="email">
                  <el-input
                    v-model.trim="form.email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </el-form-item>
              </div>

              <div class="form-group">
                <label>Password</label>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="form.password"
                    placeholder="Enter your password"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>

              <el-button
                type="primary"
                native-type="submit"
                :loading="loading"
                class="submit-btn"
              >
                Login
              </el-button>

              <div class="form-footer">
                <router-link to="/register" class="register-link">
                  Create Account
                </router-link>
                <router-link to="/forgot-password" class="forgot-link">
                  Forgot Password?
                </router-link>
              </div>
            </el-form>
          </div>
        </div>

        <div class="keno-illustration">
          <img src="@/assets/login-removebg-preview 1.png" alt="Keno Game Illustration" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #060351;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 320px;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0;
  display: flex;
  position: relative;
}

.login-section {
  width: 520px;
  position: relative;
  z-index: 2;
  padding-left: 0;
}

.title {
  margin-bottom: 32px;
  text-align: left;
  padding-left: -24px;
}

.title img {
  width: 100%;
  max-width: 450px;
  height: auto;
  display: block;
}

.form-container {
  background: rgba(0, 3, 140, 0.8);
  border-radius: 28px;
  padding: 40px;
  width: 100%;
  max-width: 494px;
  margin-left: -20px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-bottom: 8px;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(54, 57, 202, 0.5) !important;
  border: 1px solid rgba(8, 13, 187, 0.3) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

.login-form :deep(.el-input__inner) {
  height: 48px;
  color: #FFFFFF !important;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  padding: 0 16px;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
}

.register-link,
.forgot-link {
  font-size: 14px;
  color: #FFFFFF;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.register-link:hover,
.forgot-link:hover {
  opacity: 1;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-top: 32px;
  margin-bottom: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background: #F5F5F5;
}

.keno-illustration {
  position: fixed;
  right: 1%;
  top: 53%;
  transform: translateY(-50%);
  width: 700px;
  height: auto;
  z-index: 1;
}

.keno-illustration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (min-width: 1440px) {
  .login-section {
    padding-left: 40px;
  }
}

@media (max-width: 1200px) {
  .login-section {
    padding-left: 20px;
  }

  .title {
    padding-left: 20px;
  }

  .form-container {
    margin-left: 20px;
  }

  .keno-illustration {
    width: 650px;
  }
}

@media (max-width: 991px) {
  .content-wrapper {
    margin: 0 auto;
    padding: 0 20px;
  }

  .login-section {
    width: 100%;
    max-width: 494px;
    margin: 0 auto;
    padding-left: 0;
  }
  
  .title {
    text-align: center;
    padding-left: 0;
  }
  
  .title img {
    margin: 0 auto;
    max-width: 380px;
  }

  .form-container {
    max-width: 100%;
    margin-left: 0;
  }
  
  .keno-illustration {
    position: absolute;
    opacity: 0.3;
    width: 100%;
    right: 0;
  }
}

@media (max-width: 767px) {
  .content-wrapper {
    padding: 0 16px;
  }
  
  .form-container {
    padding: 32px;
  }

  .title img {
    max-width: 320px;
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    padding: 0 12px;
  }
  
  .form-container {
    padding: 24px;
  }

  .title img {
    max-width: 280px;
  }
}
</style>