<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { FormRules } from 'element-plus'
import { useFormValidation } from '@/composables/useFormValidation'
import { useSuccessModal } from '@/composables/useSuccessModal'
import { watch } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const { formRef, loading, validateForm } = useFormValidation()
const { showSuccessModal } = useSuccessModal()

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  dateOfBirth: '',
  age: '',
  phoneNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
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

watch(
  () => form.dateOfBirth,
  (newVal) => {
    if (!newVal) {
      form.age = ''
      return
    }

    const birthDate = new Date(newVal)
    const today = new Date()
    let calculatedAge = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--
    }

    form.age = calculatedAge >= 0 ? calculatedAge.toString() : ''
  },
)

const rules = reactive<FormRules>({
  firstname: [{ required: true, message: 'First Name is required', trigger: 'blur' }],
  lastname: [{ required: true, message: 'Last Name is required', trigger: 'blur' }],
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
      firstname: form.firstname,
      lastname: form.lastname,
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
  <div class="image-container">
    <img src="../assets/SignInImg.png" alt="Sign In" class="main-image" />
    <img src="../assets/Group 27.png" alt="Top Left Logo" class="keno-logo" />
    <div class="text-overlay">
      <h1 class="text-heading">Get ready to dive in!</h1>
      <p class="text-body">Sign up to access exclusive game modes, and earn rewards!</p>

      <p class="text-end">Have an account already?</p>

      <div class="signin-btn">
        <el-button>Sign in</el-button>
      </div>
    </div>
    <div class="form-container">
      <div class="form-heading">
        <p>CREATE AN ACCOUNT</p>
      </div>
      <div class="form-body">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="register-form"
          @submit.prevent="handleSubmit"
        >
          <el-space wrap>
            <div class="form-group">
              <label>First Name</label>
              <el-form-item prop="firstname">
                <el-input
                  v-model.trim="form.firstname"
                  placeholder="Enter your first name"
                  class="input-firstname"
                />
              </el-form-item>
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <el-form-item prop="lastname">
                <el-input
                  v-model.trim="form.lastname"
                  placeholder="Enter your last name"
                  class="input-lastname"
                />
              </el-form-item>
            </div>
          </el-space>

          <div class="form-group">
            <label>Email</label>
            <el-form-item prop="email">
              <el-input v-model.trim="form.email" placeholder="Enter your email" type="email" />
            </el-form-item>
          </div>
          <el-space wrap>
            <div class="form-group">
              <label>Date of Birth</label>
              <el-form-item prop="dateOfBirth">
                <el-date-picker
                  v-model="form.dateOfBirth"
                  type="date"
                  placeholder="Select your birthdate"
                  :editable="false"
                  class="input-date"
                  style="height: 40px"
                />
              </el-form-item>
            </div>

            <div class="form-group">
              <label>Age</label>
              <el-form-item>
                <el-input v-model="form.age" readonly class="input-age" />
              </el-form-item>
            </div>
          </el-space>

          <div class="form-group">
            <label>Username</label>
            <el-form-item prop="username">
              <el-input v-model.trim="form.username" placeholder="Enter your username" />
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

          <div class="form-group">
            <label>Confirm Password</label>
            <el-form-item prop="confirmPassword">
              <el-input
                v-model.trim="form.confirmPassword"
                placeholder="Confirm your password"
                type="password"
                show-password
              />
            </el-form-item>
          </div>

          <div class="form-footer">
            <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
              Register
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
  margin-top: 8px;
  margin-left: 57px;
  margin-right: 57px;
}
.el-space {
  width: 100%;
}
.el-input {
  height: 40px;
}

.input-firstname,
.input-lastname {
  width: 226px;
  height: 40px;
}
.input-age {
  width: 232px;
}

.form-group label {
  color: #060351;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}
.form-footer .el-button {
  margin-top: 8px;
  width: 460px;
  height: 50px;
  font-size: 16px;
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
.signin-btn {
  margin-top: 24px;
}
.signin-btn,
.el-button {
  margin-left: auto;
  margin-right: auto;
  width: 202px;
  height: 50px;
  background-color: transparent;
  color: #f8ab00;
}
.signin-btn:hover .el-button {
  color: #060351;
  background-color: #f8ab00;
  border: none;
}
</style>
