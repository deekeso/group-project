<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { CaretRight } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'

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

function directToTutorial() {
  router.push('/tutorial')
}

function scrollToGames() {
  window.location.href = "#game-modes"
}
</script>

<template>
  <el-dialog v-model="isSigninVisible" style="background-color: transparent" center @close="signinFormRef?.resetForm()">
    <SigninForm ref="signinFormRef" @close="isSigninVisible = false" @open-signup="() => {
      isSigninVisible = false
      isSignupVisible = true
    }" />
  </el-dialog>

  <el-dialog v-model="isSignupVisible" style="background-color: transparent" center @close="signupFormRef?.resetForm()">
    <SignupForm ref="signupFormRef" @close="isSignupVisible = false" @open-signin="() => {
      isSignupVisible = false
      isSigninVisible = true
    }" />
  </el-dialog>

  <el-container>

    <el-header>
      <Navbar />
    </el-header>

    <el-main>

      <el-row class="hero-section">

        <el-col :span="24" :md="10">

          <el-space alignment="center" style="height: 100%;">

            <el-space size="large" direction="vertical" alignment="start">

              <div class="slogan-heading">
                <h1>Fast Picks, Big Wins!</h1>
              </div>

              <p class="slogan-body">
                Keno Plus offers fast-paced excitement with Classic and Mini Keno options, letting you
                choose between suspenseful 80-number draws or quick 49-number rounds — all designed for
                thrilling, customizable play.
              </p>

              <el-space alignment="" wrap>

                <div class="tutorial-btn">
                  <el-button @click="directToTutorial">
                    <el-icon :size="32">
                      <CaretRight class="Icon" />
                    </el-icon>
                    Learn How to Play Keno</el-button>
                </div>

                <div class="play-btn">
                  <el-button @click="scrollToGames">
                    <el-icon :size="32">
                      <CaretRight class="Icon" />
                    </el-icon>
                    Start Playing!</el-button>
                </div>

              </el-space>

            </el-space>

          </el-space>

        </el-col>

        <el-col :span="14" class="hidden-sm-and-down">
          <img class="hero" src="@/assets/KenoPlay.png" />
        </el-col>
      </el-row>

      <div class="heading" id="game-modes">
        <h1>Game Modes</h1>
      </div>

      <hr>

      <GameModesCard @trigger-signin="showSigninModal" />

    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0;
  height: fit-content;
  width: 100%;
  margin: 0 auto;
}

.el-main {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

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


.hero-section {
  margin-bottom: 60px;
}

.hero {
  width: 100%;
}

.slogan-heading {
  font-family: 'Grandstander', sans-serif;
  font-size: 1.4rem;
  font-variation-settings: 'wght' 700;
  color: #fcd119;
  text-shadow: 3px 3px 12px #bc4615;
  animation: textGlow 1.5s ease-in-out infinite;
}

.slogan-body {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #f8f8f8;
}

.play-btn:hover .el-button {
  box-shadow: 0 0.5em 0.5em -0.4em #fa812f;
  transform: translateY(-0.25em);
}

.play-btn .el-button {
  background: #f8ab00;
  border: none;
  color: #060351;
  border-radius: 30px;
  height: 48px;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 14px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.play-btn .Icon {
  color: #060351;
  margin-right: 14px;
}

.tutorial-btn:hover .el-button {
  box-shadow: 0 0.5em 0.5em -0.4em #fa812f;
  transform: translateY(-0.25em);
}

.tutorial-btn .el-button {
  background: none;
  border: 2px solid #f8ab00;
  color: #f8ab00;
  border-radius: 30px;
  height: 48px;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 14px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.tutorial-btn .Icon {
  color: #f8ab00;
  margin-right: 14px;
}

::v-deep(.el-dialog__header) {
  display: none;
}

::v-deep(.el-dialogcenter) {
  display: none;
}
@keyframes textGlow {
  0% {
    text-shadow: 0 0 10px rgba(254, 202, 67, 0.3);
  }
  50% {
    text-shadow: 0 0 20px #FECA43,
                 0 0 30px #FECA43,
                 0 0 40px #FECA43;
  }
  100% {
    text-shadow: 0 0 10px rgba(254, 202, 67, 0.3);
  }
}
</style>
