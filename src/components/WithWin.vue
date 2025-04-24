<template>
  <GameDialog>
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <p>YOU WON</p>
    <h1>₱50.00</h1> <!-- Sample Win -->

    <div>
      <img src="/src/assets/gold-trunk-win.png" alt="">
    </div>
    <button class="collect-btn">Collect</button>
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'
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
p{
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
  background: #ffc13a ;
}
@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');
</style>
