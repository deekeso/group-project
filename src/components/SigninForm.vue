<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { FormRules } from 'element-plus'
import { useFormValidation } from '@/composables/useFormValidation'
import { useSuccessModal } from '@/composables/useSuccessModal'

const router = useRouter()
const authStore = useAuthStore()
const { formRef, loading, validateForm } = useFormValidation()
const { showSuccessModal } = useSuccessModal()

const form = reactive({
  email: '',
  password: '',
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
    { min: 1, message: 'Email cannot be empty spaces', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    { pattern: /\S/, message: 'Password cannot be empty spaces', trigger: 'blur' },
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

    await authStore.login(form.email, form.password)

    await showSuccessModal('Login Successful', 'Welcome back to Keno Plus!')

    // Get redirect path from query or default to home
    const redirect = (router.currentRoute.value.query.redirect as string) || '/home'
    router.push(redirect)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    ElMessage.error(error.message || 'An error occurred during login')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="image-container">
    <img src="../assets/SignInImg.png" alt="Sign In" class="main-image" />
    <img src="../assets/Group 27.png" alt="Top Left Logo" class="keno-logo" />
    <div class="text-overlay">
      <h1 class="text-heading">Welcome to Keno Plus!</h1>
      <p class="text-body">
        Step right in and let the numbers work their magic. Log in now to play and feel the thrill!
      </p>

      <p class="text-end">Dont have an account?</p>

      <div class="signup-btn">
        <el-button>Sign Up</el-button>
      </div>
    </div>
    <div class="form-container">
      <div class="form-heading">
        <p>Sign In</p>
      </div>
      <div class="form-body">
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
              <el-input v-model.trim="form.email" placeholder="Enter your email" type="email" />
            </el-form-item>
          </div>

          <div class="form-group" style="margin-top: 24px">
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
          <div class="forgot-password">
            <router-link to="/forgot-password" class="forgot-link"> Forgot Password? </router-link>
          </div>

          <div class="form-footer">
            <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
              Login
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-container {
  background-color: rgb(235, 235, 235);
  border-radius: 0px 12px 12px 0px;
  width: 574px;
  height: 722px;
}
.form-heading {
  color: #060351;
  font-size: 22px;
  font-family: 'Inter', sans-serif;
  font-variation-settings: 'wght' 700;
  margin-top: 28px;
  margin-left: 28px;
}

.form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-left: 57px;
  margin-right: 57px;
}
.el-input {
  width: 460px;
  height: 54px;
}

.form-group label {
  color: #060351;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}
.forgot-password .forgot-link {
  margin-top: 24px;
  color: #060351;
  text-decoration: underline;
}
.form-footer .el-button {
  margin-top: 24px;
  width: 460px;
  height: 60px;
  font-size: 20px;
  background-color: #f8ab00;
  color: #060351;
}
.image-container {
  position: relative;
  width: fit-content;
  display: flex;
}
.main-image {
  width: 100%; /* Adjust as needed */
  display: block;
}
.keno-logo {
  position: absolute;
  top: 0px; /* Adjust position */
  left: 28px; /* Adjust position */
  width: 200px;
  height: auto;
}
.text-overlay {
  position: absolute;
  top: 25%;
  left: 10%;

  margin-left: auto;
  margin-right: auto;

  font-family: 'Grandstander', sans-serif;
  font-variation-settings: 'wght' 700;
  color: #f8ab00;
  font-size: 14px;
  font-weight: bold;
}
.text-body {
  position: absolute;
  margin-top: 40px;
  text-align: center;
  font-family: Roboto, sans-serif;
  width: 100%;
}
.text-end {
  margin-top: 170px;
  text-align: center;
  font-family: Roboto, sans-serif;
}
.signup-btn {
  margin-top: 24px;
}
.signup-btn,
.el-button {
  margin-left: auto;
  margin-right: auto;
  width: 202px;
  height: 50px;
  background-color: transparent;
  color: #f8ab00;
}
.signup-btn:hover .el-button {
  color: #060351;
  background-color: #f8ab00;
  border: none;
}
</style>
