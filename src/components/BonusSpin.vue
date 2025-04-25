BonusRound.vue

<template>
  <GameDialog>
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <h1>YOU WON</h1>
    <p>SPIN WHEEL</p> <!-- Sample Win -->

    <div class="wheel-container" @click="spinWheel">
      <img src="/src/assets/wheel pin.png" alt="Wheel Pin" class="wheel-pin">
      <img src="/src/assets/wheel (1).png" alt="Wheel" class="wheel" ref="wheelRef">
      <div class="spin-text">SPIN</div>
    </div>
  </GameDialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameDialog from '../components/GameDialog.vue';

const wheelRef = ref(null);

const spinWheel = () => {
  const wheel = wheelRef.value;
  if (wheel) {
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Random degree for rotation
    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = `rotate(${randomDegree}deg)`;
  }
};

onMounted(() => {
  const wheelContainer = document.querySelector('.wheel-container');
  if (wheelContainer) {
    wheelContainer.addEventListener('click', spinWheel);
  }
});
</script>

<style scoped>
h1 {
  color: #f8ab00;
  text-transform: uppercase;
  font-family: 'Mukta Mahee';
  font-style: normal;
  font-weight: 700;
  font-size: 100px;
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
  font-size: 30px;
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
  width: 300px;
  height: 300px;
  margin: 0 auto;
  cursor: pointer;
}
.wheel {
  width: 100%;
  height: 100%;
  transition: transform 4s ease-out;
}
.wheel-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}
.spin-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #f8ab00;
}
.collect-btn {
  width: 100%;
  border-radius: 100px;
  background: #f8ab00;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-block: 10px;
}
.collect-btn:hover {
  background: #ffc13a;
}
@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');
</style>
