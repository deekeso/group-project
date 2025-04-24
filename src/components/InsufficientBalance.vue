<template>
  <GameDialog>
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <h1>INSUFFICIENT BALANCE!</h1>

    <div>
      <img src="/src/assets/KenoMaster.png" alt="" />
    </div>
    <button class="deposit-btn">Deposit</button>
    <button class="cancel-btn">Cancel</button>
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');

h1 {
  color: #f8ab00;
  text-transform: uppercase;
  font-family: 'Mukta Mahee';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
  background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
.deposit-btn {
  width: 48%;
  border-radius: 100px;
  background: #f8ab00;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-block: 10px;
  margin-right: 10px;
}
.cancel-btn:hover {
  background: #f0f0f0;
}
.cancel-btn {
  width: 48%;
  border-radius: 100px;
  background: #ffffff;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-block: 10px;
}
.deposit-btn:hover {
  background: #ffc13a;
}
</style>
