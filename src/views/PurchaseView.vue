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
      <SingleCard
        :isSelected="selectionMode === 'single'"
        @select="setSelectionMode('single')"
        class="flex-item"
      />
      <MultipleCard
        :isSelected="selectionMode === 'multiple'"
        @select="setSelectionMode('multiple')"
        class="flex-item"
      />
    </div>

    <Transition name="bounce">
      <div v-if="selectionMode === 'multiple'" class="counter">
        <button class="counter-btn" @click="decrementCounter">-</button>
        <p>
          Number of cards: <strong>{{ numberOfCards }}</strong>
        </p>
        <button class="counter-btn" @click="incrementCounter">+</button>
      </div>
    </Transition>

    <button class="select-btn">Select</button>
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'
import MultipleCard from '../components/PurchaseCard/MultipleCard.vue'
import SingleCard from '../components/PurchaseCard/SingleCard.vue'
import { ref } from 'vue'

const selectionMode = ref<'single' | 'multiple'>('single')
const numberOfCards = ref<number>(0)
const MIN_NUM = 2
const MAX_NUM = 5

function setSelectionMode(mode: 'single' | 'multiple') {
  selectionMode.value = mode
}

function decrementCounter() {
  if (numberOfCards.value > MIN_NUM) {
    numberOfCards.value--
  }
}

function incrementCounter() {
  if (numberOfCards.value < MAX_NUM) {
    numberOfCards.value++
  }
}
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
.flex-group {
  display: flex;
  gap: 50px;
  margin-block: 15px;
  box-sizing: border-box;
}
.flex-item {
  width: 50%;
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
.counter {
  background-color: #ffff;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 0px;
  border-radius: 10px;
  overflow: hidden;
  height: 2rem;
  margin-bottom: 10px;
}
.counter-btn {
  font-size: large;
  padding-inline: 20px;
  height: 100%;
  border: none;
}
.counter-btn:hover {
  background: #a47cf377;
}
.counter-btn:active {
  background: #e9deff;
}
strong {
  font-weight: 600;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>
