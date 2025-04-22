<template>
  <GameDialog>
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
  font-weight: bold;
  border: none;
  padding-block: 10px;
}
.select-btn:hover {
  background: #ffc13a;
}
</style>
