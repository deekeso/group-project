<template>
  <GameDialog>
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <h1>BONUS ROUND</h1>
    <DIV>
      <p>SPIN WHEEL</p> 
    </DIV> <br>
   

    <div class="wheel-container">
      <img src="/src/assets/wheel pin.png" alt="Wheel Pin" class="wheel-pin">
      <div class="wheel" ref="wheelRef">
        <img src="/src/assets/wheel (1).png" alt="Wheel Body" class="wheel-body">
        <div class="options-container">
          <div 
            v-for="(option, index) in options" 
            :key="index"
            class="wheel-option"
            :style="getOptionStyle(index)"
          >
            <div class="option-text">
              <div>{{ option[0] }}</div>
              <div>{{ option[1] }}</div>
            </div>
          </div>
        </div>
        <div class="center-circle">
          <div class="spin-text" @click="spinWheel">SPIN</div>
        </div>
      </div>
    </div>

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
        <el-button class="collect-btn" @click="collectReward">Collect</el-button>
      </div>
    </el-dialog>
  </GameDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GameDialog from '../components/GameDialog.vue';

const wheelRef = ref(null);
const isSpinning = ref(false);
const result = ref('');
const showResult = ref(false);

// Update options to use arrays for two lines
const options = [
  ['DOUBLE', 'PAYOUT'],
  ['TRY', 'AGAIN'],
  ['TRY', 'AGAIN'],
  ['EXTRA', 'DRAW'],
  ['TRY', 'AGAIN'],
  ['DOUBLE', 'PAYOUT'],
  ['TRY', 'AGAIN'],
  ['EXTRA', 'DRAW'],
  ['TRY', 'AGAIN'],
  ['TRY', 'AGAIN']
];

const getRotationDegrees = (index: number) => {
  return 360 - (index * 36); // 360/10 = 36 degrees per segment
};

const getOptionStyle = (index: number) => {
  const angle = index * 36;
  const radian = (angle - 90) * (Math.PI / 180);
  const radius = 180; // Adjust based on wheel size
  
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;
  
  return {
    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
    transformOrigin: 'center'
  };
};

const spinWheel = () => {
  if (isSpinning.value) return;
  
  const wheel = wheelRef.value;
  if (wheel) {
    isSpinning.value = true;
    
    // Random number of full rotations (5-10) plus random segment
    const fullRotations = Math.floor(Math.random() * 5) + 5;
    const randomSegment = Math.floor(Math.random() * 10);
    const totalDegrees = fullRotations * 360 + getRotationDegrees(randomSegment);
    
    wheel.style.transform = `rotate(${totalDegrees}deg)`;
    
    // Get result after animation ends
    setTimeout(() => {
      result.value = options[randomSegment].join(' '); // Join the two lines with space
      isSpinning.value = false;
      showResult.value = true; // Show result modal after spin
    }, 4000);
  }
};

const collectReward = () => {
  showResult.value = false;
  // Add any reward collection logic here
};
</script>

<style scoped>
h1 {
  color: #f8ab00;
  text-transform: uppercase;
  font-family: 'Mukta Mahee';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  background: linear-gradient(111.32deg, #F8AC38 26.41%, #E68339 96.3%);
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
  background: linear-gradient(111.32deg, #F8AC38 26.41%, #E68339 96.3%);
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
  border: 3px solid #FECA43;
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
  color: #FECA43;
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
  color: #FECA43;
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
  background: #FECA43;
  color: #1C1B4D;
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
  background: #FFD700;
}
.result-dialog :deep(.el-dialog) {
  background: #1C1B4D;
  border: 2px solid #FECA43 ;
  border-radius: 20px;
}

.result-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1C1B4D; /* Added background color */
}

.result-text {
  color: #FFFFFF;
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
  color: #FECA43;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(254, 202, 67, 0.3); /* Added glow effect */
}

/* Override element-plus dialog background */
:deep(.el-dialog__header) {
  background: #1C1B4D;
  border-bottom: 1px solid rgba(254, 202, 67, 0.3);
  margin-right: 0;
  padding: 20px;
}

:deep(.el-dialog__header .el-dialog__title) {
  color: #FFFFFF !important; /* Force white color */
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
}

:deep(.el-dialog__body) {
  background: #1C1B4D;
  padding: 20px;
}

@keyframes glow {
  0% { box-shadow: 0 0 5px #FECA43; }
  50% { box-shadow: 0 0 20px #FECA43; }
  100% { box-shadow: 0 0 5px #FECA43; }
}

@keyframes glowingBorder {
  0% {
    box-shadow: 0 0 10px #FECA43,
                0 0 20px #FECA43,
                0 0 30px #FECA43;
    transform: rotate(0deg);
  }
  50% {
    box-shadow: 0 0 20px #FECA43,
                0 0 30px #FECA43,
                0 0 40px #FECA43;
  }
  100% {
    box-shadow: 0 0 10px #FECA43,
                0 0 20px #FECA43,
                0 0 30px #FECA43;
    transform: rotate(360deg);
  }
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

@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap');
</style>
