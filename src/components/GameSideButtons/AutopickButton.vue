<template>
  <div class="autopick-container">
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
  border-radius: 10px 10px 0 0;
  width: 100%;
  text-align: center;
  height: 100%;
  max-height: 300px;
  overflow: scroll;

  /* Hide scrollbar for IE, Edge, and Firefox */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
/* Hide scrollbar for Chrome, Safari, and Opera */
.number-container::-webkit-scrollbar {
  display: none;
}
.number {
  font-size: 2rem;
  color: #ffff;
  padding-inline: 10px;
  font-weight: 600;
}
.selected {
  background-color: #ffcc00;
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
