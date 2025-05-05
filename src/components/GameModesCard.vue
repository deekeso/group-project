<script setup lang="ts">
import { defineEmits } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import ClassicKenoImg from '@/assets/ClassicKeno - Copy.png'
import MiniKenoImg from '@/assets/MiniKeno - Copy.png'

const emit = defineEmits(['trigger-signin'])
const router = useRouter()
const authStore = useAuthStore()

function handleMiniKeno() {
  if (!authStore.isAuthenticated) {
    emit('trigger-signin')
  } else {
    router.push('/mini-keno')
  }
}

function handleClassicKeno() {
  if (!authStore.isAuthenticated) {
    emit('trigger-signin')
  } else {
    router.push('/classic-keno')
  }
}

</script>
<template>
  <div class="gamemode-container">
    <!-- <el-card>
        <img src="../assets/ClassicKeno.png" class="classicImg" />
        <div class="card-heading">
          <h2>Classic Keno</h2>
        </div>
        <div class="card-body">
          <div class="description">
            <p>
              Pick up to 15 numbers from 80 for a thrilling casino experience. Bigger grids mean
              higher rewards!
            </p>
          </div>
          <div class="play-btn">
            <el-button @click="handleClassicKeno">
              <el-icon :size="38">
                <CaretRight class="Icon" />
              </el-icon>
              Play Classic Keno
            </el-button>
          </div>
        </div>
      </el-card> -->

    <el-card>
      <el-image style="width: 100%; height: 100%; object-position: center;" :src="ClassicKenoImg" fit="cover" />
      <template #footer>
        <el-space direction="vertical" alignment="center">
          <h1 class="title">Classic Keno</h1>
          <p class="details">
            Pick up to 15 numbers from 80 for a thrilling casino experience. Bigger grids mean
            higher rewards!
          </p>
          <div class="play-btn">
            <el-button @click="handleClassicKeno">
              <el-icon :size="38">
                <CaretRight class="Icon" />
              </el-icon>
              Play Classic Keno
            </el-button>
          </div>
        </el-space>
      </template>
    </el-card>

    <el-card>
      <el-image style="width: 100%; height: 100%; object-position: center;" :src="MiniKenoImg" fit="cover" />
      <template #footer>
        <el-space direction="vertical" alignment="center">
          <h1 class="title">Mini Keno</h1>
          <p class="details">
            Pick up to 10 numbers from 40 for quick play and better odds A perfect choice for
            rapid-fire fun!
          </p>
          <div class="play-btn">
            <el-button @click="handleMiniKeno">
              <el-icon :size="38">
                <CaretRight class="Icon" />
              </el-icon>
              Play Mini Keno
            </el-button>
          </div>
        </el-space>
      </template>
    </el-card>

  </div>
</template>

<style scoped>
.gamemode-container {
  padding-top: 60px;
  display: flex;
  gap: 60px;
}

.el-card {
  border-radius: 16px;
  border: none;
}

:deep(.el-card__body) {
  padding: 0;
  height: 600px;
}

:deep(.el-card__footer) {
  border: none;
  background: linear-gradient(180deg, #f8ab00 0%, #926500 100%);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.el-button {
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 30px;
}

.el-button:hover {
  box-shadow: 0px 0px 5px 2px #f8ab00;
}

.tutorial-btn:hover .el-button {
  box-shadow: 0 0.5em 0.5em -0.4em #fa812f;
  transform: translateY(-0.25em);
}

.play-btn .el-button {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  background-color: #060351;
  height: 48px;
  color: white;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  border: none;
  margin-top: 20px;
}

.play-btn .Icon {
  color: #f8ab00;
  margin-right: 14px;
}

.title {
  font-family: Inter, sans-serif;
  font-size: 40px;
  font-weight: 900;
  text-align: center;
}

.details {
  font-family: Roboto;
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

/* Extra small devices (phones) */
@media (max-width: 576px) {}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .gamemode-container {
    flex-direction: column;
  }

  :deep(.el-card__body) {
    height: 400px;
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}

/* .classic-container img {
  display: block;
}

.mini-container img {
  display: block;
}

.classicImg {
  width: 370px;
}

.miniImg {
  width: 370px;
}

.gamemode-container {
  margin-top: 24px;
}

.el-card {
  width: 370px;
  border: none;
  border-radius: 0px 0px 12px 12px;
  background: linear-gradient(180deg, #f8ab00 0%, #926500 100%);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.slogan-heading {
  font-family: 'Grandstander', sans-serif;
  font-size: 18px;
  font-variation-settings: 'wght' 700;

  margin-top: 24px;

  color: #fcd119;
  text-shadow: 3px 3px 12px #bc4615;

  text-align: end;
}

.slogan-body {
  font-family: Inter, sans-serif;
  font-size: 14px;
  text-align: end;
  margin-left: 20px;
  color: #f8f8f8;
}

.slogan-body p {
  max-width: 45ch;
}

.tutorial-btn .el-button {
  margin-top: 40px;
  background-color: #f8ab00;
  border-radius: 30px;
  height: 48px;
  width: 300px;
  color: #060351;
  border: none;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 14px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.tutorial-btn .Icon {
  color: #060351;
  margin-right: 14px;
}

.keno-img img {
  width: 408px;
  align-items: end;
  margin-top: 120px;
} */
</style>
