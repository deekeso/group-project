<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import Navbar from '@/components/TheNavbar.vue'
import GameModesCard from '@/components/GameModesCard.vue'
import SigninForm from '@/components/SigninForm.vue'
import SignupForm from '@/components/SignupForm.vue'

const isSigninVisible = ref(false)
const isSignupVisible = ref(false)

// Add refs for the form components
const signinFormRef = ref()
const signupFormRef = ref()

const showSigninModal = () => {
  isSigninVisible.value = true
  isSignupVisible.value = false
}

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push('/home')
  }
})
</script>

<template>
  <div class="background">
    <div class="home">
      <Navbar />

      <div class="heading">
        <h1>Game Modes</h1>
      </div>
      <hr />
      <div class="gamemode-container">
        <GameModesCard @trigger-signin="showSigninModal" />
        <el-dialog
          v-model="isSigninVisible"
          style="background-color: transparent"
          center
          @close="signinFormRef?.resetForm()"
        >
          <SigninForm
            ref="signinFormRef"
            @close="isSigninVisible = false"
            @open-signup="() => {
              isSigninVisible = false
              isSignupVisible = true
            }"
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
            @open-signin="() => {
              isSignupVisible = false
              isSigninVisible = true
            }"
          />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  justify-items: center;
}
.home {
  min-height: 100vh;
  width: 1216px;
  padding-top: 88px;
  margin-inline: 1rem;
  box-sizing: border-box;
}
.heading {
  font-family: 'Grandstander', sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 18px;
  color: #fcd119;
  text-shadow: 3px 3px 12px #bc4615;
}
.gamemode-container {
  display: flex;
  justify-content: center;
  margin-inline: 2rem;
}

::v-deep(.el-dialog__header) {
  display: none;
}
::v-deep(.el-dialogcenter) {
  display: none;
}
</style>
