<template>
  <GameDialog>
    <svg
      class="close-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      @click="$emit('close')"
    >
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      ></path>
    </svg>
    <p>YOU WON</p>
    <h1>₱{{ totalWins }}</h1>

    <div>
      <img src="/src/assets/gold-trunk-win.png" alt="" />
    </div>
    <div class="breakdown-container" v-if="numberOfCards > 1">
      <Transition name="bounce"
        ><div v-if="showBreakdown" class="breakdown-content">
          <div class="header flex-group">
            <span v-for="header in columns" :key="header">{{ header }}</span>
          </div>
          <div class="breakdown flex-group" v-for="(card, i) in cards" :key="i">
            <span>Card {{ i + 1 }}</span>
            <span>{{ wager }}</span>
            <span> {{ card.multiplier }}x </span>
            <span>₱{{ card.winnings }}</span>
            <span>{{ card.result }}</span>
          </div>
        </div></Transition
      >
    </div>
    <el-button @click="showBreakdownToggle" class="view-btn">{{ dynamicButtonText() }}</el-button>
    <!-- <button class="collect-btn">Collect</button> -->
  </GameDialog>
</template>

<script setup lang="ts">
import GameDialog from '../components/GameDialog.vue'
import winSound from '@/assets/sounds/withwin/8-bit-video-game-win-level-sound-version-1-145827.mp3'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const gameStore = useGameStore()
const { cards, totalWins, numberOfCards, wager } = storeToRefs(gameStore)
const columns = ['Card', 'Wager', 'Multiplier', 'Payout', 'Result']
const showBreakdown = ref<boolean>(false)
const showBreakdownToggle = () => (showBreakdown.value = !showBreakdown.value)
// const props = defineProps<{
//   winValue: number
// }>()

const dynamicButtonText = () => {
  if (showBreakdown.value) {
    return 'Hide breakdown'
  } else {
    return 'Show breakdown'
  }
}
const playWinSound = () => {
  const audio = new Audio(winSound)
  audio.play()
}

onMounted(() => {
  playWinSound()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@200;300;400;500;600;700;800&display=swap');

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
.view-btn {
  width: 100%;
  border-radius: 100px;
  background: #f8ab00;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-block: 10px;
  margin-top: 10px;
}
.view-btn:hover {
  background: #ffc13a;
}
.view-btn:active {
  background: rgb(255, 238, 0);
}
.header {
  background-color: #a47cf3;
  color: white;
}
.header span {
  font-weight: 600;
}
.flex-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.breakdown-content {
  border-radius: 10px;
  overflow: hidden;
}
.breakdown {
  color: black;
  background: rgb(238, 238, 238);
  border: 1px solid #a47cf3;
}
.breakdown span,
.header span {
  width: 100%;
  min-width: max-content;
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
