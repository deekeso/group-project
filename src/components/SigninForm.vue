<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus' // Changed to type-only import
import { useAuthStore } from '@/stores/auth'
import SignupForm from './SignupForm.vue'

// Add emit definition
const emit = defineEmits(['close', 'open-signup'])

const showSignupForm = ref(false)
const showSigninForm = ref(true)

const router = useRouter()
const authStore = useAuthStore()

// Form validation logic directly in component
const formRef = ref<FormInstance>()
const loading = ref(false)

// Update the validateForm function to properly handle validation
const validateForm = () => {
  if (!formRef.value) return Promise.resolve(false)

  return formRef.value.validate()
    .then(() => true)
    .catch(() => {
      ElMessage.error('Please fill in all required fields correctly')
      return false
    })
}

// Success modal logic directly in component
const showSuccessModal = (title: string, message: string) => {
  try {
    ElMessageBox.alert(message, title, {
      confirmButtonText: 'OK',
      type: 'success',
      center: true,
      customClass: 'success-modal',
      showClose: false
    })
    return true
  } catch {
    return false
  }
}

// Add this interface before the form declaration
interface SigninFormData {
  email: string;
  password: string;
}

// Update the form declaration to use the interface
const form = reactive<SigninFormData>({
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

// Update handleSubmit to properly await validation
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  if (loading.value) return

  loading.value = true

  try {
    const isValid = await validateForm()
    if (!isValid) {
      loading.value = false
      return
    }

    // Check for empty fields explicitly
    if (!form.email.trim() || !form.password.trim()) {
      ElMessage.error('Please fill in all required fields')
      loading.value = false
      return
    }

    await authStore.login(form.email, form.password)
    const modalShown = showSuccessModal('Login Successful', 'Welcome back to Keno Plus!')

    if (!modalShown) {
      ElMessage({
        message: 'Login successful! Welcome back to Keno Plus!',
        type: 'success',
      })
    }

    emit('close')
    const redirect = (router.currentRoute.value.query.redirect as string) || '/home'
    router.push(redirect)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during login'
    ElMessage.error(errorMessage)
  } finally {
    loading.value = false
  }
}

// Add method to handle signup button click
const handleSignupClick = () => {
  emit('close')
  emit('open-signup')
}

// Add resetForm method
const resetForm = () => {
  form.email = ''
  form.password = ''
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

// Expose resetForm method to parent
defineExpose({ resetForm })
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <el-dialog v-model="showSignupForm" @close="showSignupForm = false" style="background-color: transparent" center>
      <SignupForm @close="((showSignupForm = false), (showSigninForm = true))" />
    </el-dialog>
    <div class="dialog-content">
        <!-- <img src="../assets/SignInImg.png" alt="Sign In" class="main-image" />
        <img src="../assets/Group 27.png" alt="Top Left Logo" class="keno-logo" /> -->
      <div class="form-container">
        <div class="form-heading">
            <p>Sign In</p>
          </div>
          <div class="form-body">
            <el-form ref="formRef" :model="form" :rules="rules" class="login-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>Email</label>
                <el-form-item prop="email">
                  <el-input v-model.trim="form.email" placeholder="Enter your email" type="email" />
                </el-form-item>
              </div>

              <div class="form-group" style="margin-top: 24px">
                <label>Password</label>
                <el-form-item prop="password">
                  <el-input v-model.trim="form.password" placeholder="Enter your password" type="password"
                    show-password />
                </el-form-item>
              </div>
              <div class="forgot-password">
                <router-link to="/forgot-password" class="forgot-link"> Forgot Password? </router-link>
              </div>

              <div class="form-footer">
                <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
                  Sign in
                </el-button>
              </div>
            </el-form>
          </div>
          <p class="text-end">Dont have an account? <el-link type="primary" @click="handleSignupClick">Sign up here.</el-link></p>

      </div>
    </div>
  </div>
  <!-- <div class="image-container">
    <img src="../assets/SignInImg.png" alt="Sign In" class="main-image" />
    <img src="../assets/Group 27.png" alt="Top Left Logo" class="keno-logo" />
    <div class="text-overlay">
      <h1 class="text-heading">Welcome to Keno Plus!</h1>
      <p class="text-body">
        Step right in and let the numbers work their magic. Log in now to play and feel the thrill!
      </p>

      <p class="text-end">Dont have an account?</p>

      <div class="signup-btn">
        <el-button @click="handleSignupClick">Sign Up</el-button>
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
  </div> -->
</template>
<style scoped>
.dialog-content {
  display: grid;
  grid-template-columns: 1fr;
  background-color: white;
  height: fit-content;
  width: 100%;
  border-radius: 12px;
}

.left-container,
.form-container {
  height: 100%;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.left-container {
  background-image: url(src/assets/SignInImg.png);
  background-position: center;
  background-size: cover;
}

@media (max-width: 576px) {
  .dialog-content {}
}

/* Small devices (tablets) */
@media (max-width: 768px) {}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}

/* .form-container {
  background-color: rgb(235, 235, 235);
  border-radius: 0px 12px 12px 0px;
  width: 574px;
  height: 722px;
} */

/* .form-heading {
  color: #060351;
  font-size: 22px;
  font-family: 'Inter', sans-serif;
  font-variation-settings: 'wght' 700;
  margin-top: 28px;
  margin-left: 28px;
} */

/* .form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-left: 57px;
  margin-right: 57px;
} */

.el-input {
  width: 100%;
  height: 54px;
}

.form-body {
  width: 100%;
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
  float: right;
}

.form-footer .el-button {
  margin-top: 24px;
  width: 100%;
  height: 60px;
  font-size: 20px;
  background-color: #f8ab00;
  color: #060351;
}

.image-container {
  position: relative;
  width: 100%;
  display: flex;
}


.keno-logo {
  position: absolute;
  top: 0px;
  /* Adjust position */
  left: 28px;
  /* Adjust position */
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
  margin-top: 24px;
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

::v-deep(.el-dialog__header) {
  display: none;
}

.form-heading {
  color: #060351;
  font-size: 22px;
  font-family: 'Inter', sans-serif;
  font-variation-settings: 'wght' 700;
  margin-top: 28px;
  margin-left: 28px;
}
</style>
