<template>
  <GameDialog>
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <h1>Purchase Cards</h1>

    <div class="flex-group">
      <SingleCard />
      <MultipleCard />
    </div>
    <button class="select-btn">Select</button>
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'
import MultipleCard from '../components/PurchaseCard/MultipleCard.vue'
import SingleCard from '../components/PurchaseCard/SingleCard.vue'
</script>

<style scoped>
h1 {
  color: #f8ab00;
  font-weight: bold;
  text-transform: uppercase;
}
.close-icon {
  height: 25px;
  float: left;
  color: #ffff;
}
.close-icon:hover {
  color: #ffcf68;
}
.flex-group {
  display: flex;
  gap: 50px;
  margin-block: 15px;
  box-sizing: border-box;
}
.select-btn {
  width: 100%;
  border-radius: 100px;
  background: #f8ab00;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-block: 10px;
}
.select-btn:hover {
  background: #ffc13a;
}
</style>
