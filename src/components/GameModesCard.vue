<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue'
</script>
<template>
  <div class="gamemode-container">
    <div class="classic-container">
      <img src="../assets/ClassicKeno.png" class="classicImg" />
      <el-card style="max-width: 392px">
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
            <el-button>
              <el-icon :size="38"><CaretRight class="Icon" /></el-icon>
              Play Classic Keno
            </el-button>
          </div>
        </div>
      </el-card>
    </div>

    <div class="mini-container">
      <img src="../assets/MiniKeno.png" class="miniImg" />
      <el-card style="max-width: 392px">
        <div class="card-heading">
          <h2>Mini Keno</h2>
        </div>
        <div class="card-body">
          <div class="description">
            <p>
              Pick up to 10 numbers from 40 for quick play and better odds A perfect choice for
              rapid-fire fun!
            </p>
          </div>
          <div class="play-btn">
            <el-button>
              <el-icon :size="38"><CaretRight class="Icon" /></el-icon>
              Play Mini Keno
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.gamemode-container {
  display: flex;
  gap: 32px;
}
.classic-container img {
  display: block;
}
.mini-container img {
  display: block;
}
.classicImg {
  margin-top: 24px;
  width: 370px;
}
.miniImg {
  margin-top: 24px;
  width: 370px;
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
.card-heading h2 {
  font-family: Inter, sans-serif;
  font-size: 40px;
  font-weight: 900;
  text-align: center;
}
.card-body p {
  font-family: Roboto;
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
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
</style>
