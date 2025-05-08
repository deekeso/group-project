<template>
  <h1>BONUS ROUND</h1>
  <DIV>
    <p>SPIN WHEEL</p>
  </DIV>
  <br />

  <div class="wheel-container"></div>
  <div id="chart"></div>

  <el-dialog
    v-model="showResult"
    title="Spin Result"
    width="30%"
    center
    :show-close="false"
    class="result-dialog"
  >
    <div class="result-content">
      <h2>You Got:</h2>
      <div class="result-text">{{ result }}</div>
      <el-button class="collect-btn" @click="collectReward">Okay</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as d3 from 'd3'
export default {
  mounted() {
    const script = document.createElement('script')
    // '../../public/roulette/script1.js
    script.src = '/roulette/script1.js'
    script.async = true

    script.onload = () => console.log('Script loaded successfully!')
    script.onerror = () => console.error('Failed to load script.')
    document.body.appendChild(script)
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap');
h1 {
  color: #f8ab00;
  text-transform: uppercase;
  font-family: 'Mukta Mahee';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 10px rgba(202, 134, 33, 0.25);
}
p {
  color: #f8ab00;
  text-transform: uppercase;
  font-family: 'Mukta Mahee';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 10px rgba(202, 134, 33, 0.25);
}
.close-icon {
  height: 25px;
  float: left;
  color: #ffff;
}
.close-icon:hover {
  color: #ffcf68;
}
.wheel-container {
  position: relative;
  width: 528.43px;
  height: 480px;
  margin: 0 auto;
}
.wheel {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}
.wheel-body {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}

.wheel-body::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: transparent;
  border: 3px solid #feca43;
  animation: glowingBorder 2s linear infinite;
  z-index: -1;
}

.options-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wheel-option {
  position: absolute;
  left: calc(50% - 55px);
  top: calc(50% - 20px); /* Adjusted to account for two lines */
  width: 110px;
  height: 40px; /* Increased height for two lines */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #feca43;
}

.option-text {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Space between lines */
  align-items: center;
  justify-content: center;
}

.center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 70px;
  background: #843911;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.spin-text {
  font-family: 'Inter';
  font-weight: 900;
  font-size: 36px;
  color: #feca43;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(254, 202, 67, 0.3);
  animation: textGlow 1.5s ease-in-out infinite;
}
.wheel-pin {
  position: absolute;
  width: 41.31px;
  height: 37.03px;
  left: calc(50% - 20.65px);
  top: -10px; /* Changed from -20px to -10px to bring pin closer */
  z-index: 10;
}
.collect-btn {
  width: 200px;
  height: 50px;
  background: #feca43;
  color: #1c1b4d;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.collect-btn:hover {
  transform: scale(1.05);
  background: #ffd700;
}
.result-dialog :deep(.el-dialog) {
  background: #1c1b4d;
  border: 2px solid #feca43;
  border-radius: 20px;
}

.result-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1c1b4d; /* Added background color */
}

.result-text {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  background: rgba(28, 27, 77, 0.9); /* Darkened blue background */
  border: 1px solid rgba(254, 202, 67, 0.3); /* Added subtle border */
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 0 15px rgba(254, 202, 67, 0.1); /* Added glow effect */
}

.result-content h2 {
  color: #feca43;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(254, 202, 67, 0.3); /* Added glow effect */
}

/* Override element-plus dialog background */
:deep(.el-dialog__header) {
  background: #1c1b4d;
  border-bottom: 1px solid rgba(254, 202, 67, 0.3);
  margin-right: 0;
  padding: 20px;
}

:deep(.el-dialog__header .el-dialog__title) {
  color: #ffffff !important; /* Force white color */
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
}

:deep(.el-dialog__body) {
  background: #1c1b4d;
  padding: 20px;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px #feca43;
  }
  50% {
    box-shadow: 0 0 20px #feca43;
  }
  100% {
    box-shadow: 0 0 5px #feca43;
  }
}

@keyframes glowingBorder {
  0% {
    box-shadow:
      0 0 10px #feca43,
      0 0 20px #feca43,
      0 0 30px #feca43;
    transform: rotate(0deg);
  }
  50% {
    box-shadow:
      0 0 20px #feca43,
      0 0 30px #feca43,
      0 0 40px #feca43;
  }
  100% {
    box-shadow:
      0 0 10px #feca43,
      0 0 20px #feca43,
      0 0 30px #feca43;
    transform: rotate(360deg);
  }
}

@keyframes textGlow {
  0% {
    text-shadow: 0 0 10px rgba(254, 202, 67, 0.3);
  }
  50% {
    text-shadow:
      0 0 20px #feca43,
      0 0 30px #feca43,
      0 0 40px #feca43;
  }
  100% {
    text-shadow: 0 0 10px rgba(254, 202, 67, 0.3);
  }
}
</style>
