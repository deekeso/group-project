<template>
  <Navbar />
  <el-space direction="vertical">
    <div class="card-container">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <h3 class="card-title">{{ card.step }} {{ card.title }}</h3>
        <img :src="card.image" alt="Card Image" class="card-image" />
        <p class="card-body">{{ card.body }}</p>
      </div>
    </div>
  </el-space>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import tutorial_1 from '../assets/tutorial_1.png'
import tutorial_2 from '../assets/tutorial_2.png'
import tutorial_3_4 from '../assets/tutorial_3_4.png'
import tutorial_5 from '../assets/tutorial_5.png'
import tutorial_6 from '../assets/tutorial_6.png'
import tutorial_7 from '../assets/tutorial_7.png'
const cards = [
  {
    step: 'Step 1',
    title: 'Select game mode',
    image: tutorial_1,
    body: 'To play a full online Keno game, start by selecting your preferred game mode. You can choose Classic Keno, where numbers range from 1 to 80, or Mini Keno, which has a smaller range from 1 to 49. Each mode offers different game play experiences, so pick the one that suits your preference.',
  },
  {
    step: 'Step 2',
    title: 'Purchase cards',
    image: tutorial_2,
    body: "Once you've chosen your game mode, proceed to purchase your Keno cards. You can buy a single card or multiple cards, depending on how many chances you want in the draw. Each card allows you to select numbers within the range specified by your chosen game mode.",
  },
  {
    step: 'Step 3',
    title: 'Select your keno numbers',
    image: tutorial_3_4,
    body: "You can select the Keno numbers you wish to bet on after receiving your Keno card or cards. Each number you choose is called a 'Keno spot.' Alternatively, you can use the auto-pick feature. To do this, simply select a number, press the auto-pick button, and the system will choose a Keno spot based on the number you have selected. Once your Keno numbers are chosen, the required hits and payout will be automatically displayed.",
  },
  {
    step: 'Step 4',
    title: 'Enter your wager amount',
    image: tutorial_3_4,
    body: "After selecting your Keno numbers, the next step is to place your wager. Enter the amount you wish to bet in the 'Wager' section. You can adjust your wager according to your preferred amount. If you wish to double your wager instantly, you can simply press the x2 button, which will multiply your wager by two. Keep in mind that the amount you wager can influence the payout you receive if you win.",
  },
  {
    step: 'Step 5',
    title: 'The game begins',
    image: tutorial_5,
    body: "Once you have entered your wager, it's time to start the game. Simply press the 'Play' button to confirm your choices and begin. The system will then process your selections, and you'll see the results of the draw shortly after.",
  },
  {
    step: 'Step 6',
    title: 'Matching Numbers',
    image: tutorial_6,
    body: 'After the draw, review the results to see if any of your chosen Keno numbers match the numbers drawn. If you have matching numbers, congratulations! The system will calculate your winnings based on your wager, the number of hits, and the payout table.',
  },
  {
    step: 'Step 7',
    title: 'The results',
    image: tutorial_7,
    body: "After pressing the 'Play' button, the outcome of the draw will be displayed. If there is a match, your winnings will be shown, based on the payout and the number of hits you achieved.",
  },
]
</script>

<style scoped>
.card-container {
  margin-top: 150px;
}
.card {
  background-color: white;
  color: black;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 900px;
  margin-bottom: 60px;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.card-title {
  font-size: 1.5em;
  margin: 8px 0;
}

.card-body {
  font-size: 1em;
}
</style>
