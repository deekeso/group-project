<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { FormRules } from 'element-plus'
import Navbar from './TheNavbar.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { useSuccessModal } from '@/composables/useSuccessModal'

const router = useRouter()
const authStore = useAuthStore()
const { formRef, loading, validateForm } = useFormValidation()
const { showSuccessModal } = useSuccessModal()

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
})

const validateAge = (_rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('Date of birth is required'))
    return
  }

  const birthDate = new Date(value)
  const today = new Date()
  let calculatedAge = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--
  }

  if (calculatedAge < 18) {
    callback(new Error('You must be 18 or older to register'))
    return
  }

  callback()
}

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' },
    {
      validator: async (_rule: any, value: string, callback: Function) => {
        if (!value) {
          callback()
          return
        }

        // Check if username exists in store
        const authStore = useAuthStore()
        const userExists = authStore.users.some((u) => u.username === value)

        if (userExists) {
          callback(new Error('Username is already taken'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: 'Password must be alphanumeric', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: 'Confirm Password is required', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        if (value !== form.password) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  dateOfBirth: [
    { required: true, message: 'Date of birth is required', trigger: 'blur' },
    { validator: validateAge, trigger: 'blur' },
  ],
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

    authStore.register({
      email: form.email,
      username: form.username,
      password: form.password,
      dateOfBirth: new Date(form.dateOfBirth),
    })

    await showSuccessModal(
      'Registration Successful',
      'Welcome to Keno Plus! Your account has been successfully created.',
    )

    router.push('/home')
  } catch (error: any) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <Navbar />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="register-section">
          <h1 class="title">
            <img src="@/assets/create acc.png" alt="Create an Account" />
          </h1>

          <div class="form-container">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              class="register-form"
              @submit.prevent="handleSubmit"
            >
              <div class="form-group">
                <label>Email</label>
                <el-form-item prop="email">
                  <el-input v-model.trim="form.email" placeholder="Value" type="email" />
                </el-form-item>
              </div>

              <div class="form-group">
                <label>Username</label>
                <el-form-item prop="username">
                  <el-input v-model.trim="form.username" placeholder="Value" />
                </el-form-item>
              </div>

              <div class="form-group">
                <label>Password</label>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="form.password"
                    placeholder="Value"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>

              <div class="form-group">
                <label>Confirm Password</label>
                <el-form-item prop="confirmPassword">
                  <el-input
                    v-model.trim="form.confirmPassword"
                    placeholder="Value"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>

              <div class="form-group">
                <label>Date of Birth</label>
                <el-form-item prop="dateOfBirth">
                  <el-input v-model="form.dateOfBirth" placeholder="Value" type="date" />
                </el-form-item>
              </div>

              <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
                Submit
              </el-button>

              <div class="form-footer">
                <router-link to="/login" class="login-link">Sign In</router-link>
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
.register-page {
  min-height: 100vh;
  background: #060351;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 460px;
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

.register-section {
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
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-bottom: 8px;
}

.register-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.register-form :deep(.el-input__wrapper) {
  background: rgba(54, 57, 202, 0.5) !important;
  border: 1px solid rgba(8, 13, 187, 0.3) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

.register-form :deep(.el-input__inner) {
  height: 48px;
  color: #ffffff !important;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  padding: 0 16px;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-top: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
}

.login-link {
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.login-link:hover {
  opacity: 1;
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
  .register-section {
    padding-left: 40px;
  }
}

@media (max-width: 1200px) {
  .register-section {
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

  .register-section {
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
