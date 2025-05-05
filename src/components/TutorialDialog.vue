<template>
  <el-dialog v-model="dialogVisible" fullscreen top="40vh" width="70%" draggable class="help-dialog">
    <el-space direction="vertical">
      <TheLegend />
      <el-card v-for="(card, index) in cards" :key="index">
        <template #header>
          <div class="card-header">
            <div class="step-container">
              <span>Step</span>
              <span>{{ index + 1 }}</span>
            </div>
            <div class="card-title">
              <span>{{ card.title }}</span>
            </div>
          </div>
        </template>

        <div>
          <el-image
            :src="card.image"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[card.image]"
            fit="cover"
            class="card-image"
            hide-on-click-modal
            close-on-press-escape
          />
          <p class="description">{{ card.body }}</p>
        </div>

      </el-card>
    </el-space>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> Continue to game </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import tutorial_1 from '@/assets/tutorial_1.png'
import tutorial_2 from '@/assets/tutorial_2.png'
import tutorial_3_4 from '@/assets/tutorial_3_4.png'
import tutorial_5_6 from '@/assets/tutorial_5_6.png'
import tutorial_7 from '@/assets/tutorial_7.png'
import TheLegend from './TheLegend.vue'

const dialogVisible = defineModel('dialogVisible')

const cards = [
  {
    title: 'Select game mode',
    image: tutorial_1,
    body: 'To play a full online Keno game, start by selecting your preferred game mode. You can choose Classic Keno, where numbers range from 1 to 80, or Mini Keno, which has a smaller range from 1 to 49. Each mode offers different game play experiences, so pick the one that suits your preference.',
  },
  {
    title: 'Purchase cards',
    image: tutorial_2,
    body: "Once you've chosen your game mode, proceed to purchase your Keno cards. You can buy a single card or multiple cards, depending on how many chances you want in the draw. Each card allows you to select numbers within the range specified by your chosen game mode.",
  },
  {
    title: 'Select your keno numbers',
    image: tutorial_3_4,
    body: "You can select the Keno numbers you wish to bet on after receiving your Keno card or cards. Each number you choose is called a 'Keno spot.' Alternatively, you can use the auto-pick feature. To do this, simply select a number, press the auto-pick button, and the system will choose a Keno spot based on the number you have selected. Once your Keno numbers are chosen, the required hits and payout will be automatically displayed.",
  },
  {
    title: 'Enter your wager amount',
    image: tutorial_3_4,
    body: "After selecting your Keno numbers, the next step is to place your wager. Enter the amount you wish to bet in the 'Wager' section. You can adjust your wager according to your preferred amount. If you wish to double your wager instantly, you can simply press the x2 button, which will multiply your wager by two. Keep in mind that the amount you wager can influence the payout you receive if you win.",
  },
  {
    title: 'The game begins',
    image: tutorial_5_6,
    body: "Once you have entered your wager, it's time to start the game. Simply press the 'Play' button to confirm your choices and begin. The system will then process your selections, and you'll see the results of the draw shortly after.",
  },
  {
    title: 'Matching Numbers',
    image: tutorial_5_6,
    body: 'After the draw, review the results to see if any of your chosen Keno numbers match the numbers drawn. If you have matching numbers, congratulations! The system will calculate your winnings based on your wager, the number of hits, and the payout table.',
  },
  {
    title: 'The results',
    image: tutorial_7,
    body: "After pressing the 'Play' button, the outcome of the draw will be displayed. If there is a match, your winnings will be shown, based on the payout and the number of hits you achieved.",
  },
]
</script>

<style lang="css" scoped>
  ::v-deep(.el-card__header) {
    padding: 0;
    border: none;
  }

  ::v-deep(.el-card__body) {
    max-width: 900px;
    padding: 0;
  }

  .el-card {
    border: none;
  }

  .card-header {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .step-container {
    display: flex;
    flex-direction: column;
    width: 86px;
    height: 96px;
    background-color: #4244ed;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .step-container span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .title {
    width: 100%;
  }

  .card-image {
    width: 100%;
  }

  .card-title {
    display: flex;
    align-items: center;
    margin: 8px 0;
    padding: 0 20px;
  }

  .card-title span {
    color: black;
    font-size: 1.5em;
    font-weight: bold;
    font-size: 24px;
  }

  .description {
    padding: 20px;
  }
</style>
