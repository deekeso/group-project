<template>
  <GameDialog>
    <p>YOU WON</p>
    <h1>₱{{ props.winValue }}</h1>

    <div>
      <img src="/src/assets/gold-trunk-win.png" alt="" />
    </div>
    <button class="collect-btn">Collect</button>
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'

const props = defineProps<{
  winValue: number
}>()
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
  line-height: 100px;
  margin: 0;
  padding: 0;
  background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
