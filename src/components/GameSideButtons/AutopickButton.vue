<template>
  <div class="autopick-container">
    <!-- <div class="carousel" @scroll="console.log('wow')">
      <div class="filler-item"></div>
      <div class="item" v-for="number in 10" :key="number"></div> -->
    <div class="number-container">
      <div
        v-for="number in numbers"
        :key="number"
        :class="['number', { selected: number === selectedNumber }]"
        @click="selectNumber(number, $event)"
        ref="numberRefs"
      >
        {{ number }}
      </div>
      <!-- <div class="filler-item"></div> -->
    </div>
    <div class="autopick-btn" @click="$emit('autopick')">
      <img src="../../assets/Shuffle.png" alt="shuffle icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const numbers = ref<number[]>(Array.from({ length: 10 }, (_, i) => i + 1))
const selectedNumber = ref<number | null>(null)
const numberRefs = ref<(HTMLElement | null)[]>([])

const selectNumber = (number: number, event: Event) => {
  selectedNumber.value = number

  nextTick(() => {
    const target = event.target as HTMLElement
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

    console.log(`User selected: ${selectedNumber.value}`)
  })
}
</script>

<style scoped>
.autopick-container {
  min-width: 70px;
  max-width: 80px;
  width: 100%;
  border-radius: 10px;
}

.number-container {
  background: #846ccf;
  background: linear-gradient(
    0deg,
    rgba(132, 108, 207, 1) 10%,
    rgba(133, 108, 207, 0.712) 50%,
    rgba(132, 108, 207, 1) 90%
  );
  border: 5px solid #e7cfff;
  border-bottom: none;
  border-radius: 8px 10px 0 0;
  width: 100%;
  height: 300px;
  

  overflow: auto;
  scroll-snap-type: y mandatory;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  --scroll-gap: 5px;
  padding: var(--scroll-gap) 0;

  /* Hide scrollbar for IE, Edge, and Firefox */
  /*scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.number-container::-webkit-scrollbar {
  /* display: none; */
}

.number {
  font-size: 2rem;
  color: #ffff;
  font-weight: 600;
  height: 50px;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: calc(100px - 3 *var(--scroll-gap));
  width: 100%;
  cursor: pointer;
  user-select: none;
}
.selected {
  background-color: #d4a0ff;
  font-weight: bold;
}
.autopick-btn {
  background: #060041;
  border: 5px solid #7540c1;
  border-top: none;
  width: 100%;
  text-align: center;
  padding-block: 10px;
  border-radius: 0px 0px 10px 10px;
}
</style>
