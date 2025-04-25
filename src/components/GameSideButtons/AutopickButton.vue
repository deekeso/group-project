<template>
  <div class="autopick-container">
    <div class="gradient">
      <div></div>
    </div>
    <div class="number-container" :style="{ pointerEvents: gameIsDrawing ? 'none' : 'auto', cursor: gameIsDrawing ? 'not-allowed' : 'pointer' }">
      <div class="number filler" :style="{ cursor: 'not-allowed' }"></div>

      <!-- TODO: [Comment 1] Check for possible rendering bug, might cause inefficiency. Specifically,
        <div
        v-for="number in numbers"
        :key="number"
        :class="['number', { selected: number === selectedNumber }]" <-- This one. Renders 2 times for some reason
        @click="scrollToNumber(number)"
        @scroll="onScroll"
        ref="numberRefs">

        Did not explore this as we will not be using the .selected class
        The autopick container will also have a gradient to indicate the center (selected item),
        which makes this bug invisible.
      >-->
      <div
        v-for="number in numbers"
        :key="number"
        class="number"
        @click="scrollToNumber(number)"
        @scroll="detectCenteredNumber"
        ref="numberRefs"
      >
        {{ number }}
      </div>
      <div class="number filler"></div>
    </div>
    <button class="autopick-btn" @click="emit('numberSelected', selectedNumber)" :disabled="gameIsDrawing">
      <img src="../../assets/Shuffle.png" alt="shuffle icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
const { maxNumber, gameIsDrawing } = defineProps<{
  maxNumber: number
  gameIsDrawing: boolean
}>()

const emit = defineEmits<{
  (e: 'numberSelected', number: number): void
}>()

const numbers = ref<number[]>(Array.from({ length: maxNumber }, (_, i) => i + 1))
const selectedNumber = ref<number>(1)
const numberRefs = ref<(HTMLElement | null)[]>([])

// Function to select a centered or clicked number
const selectNumber = (number: number | null) => {
  if (number !== null) {
    selectedNumber.value = number
  }
}

// Debounce function to reduce scroll event calls
const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

// Scroll logic to detect the center element
const detectCenteredNumber = () => {
  nextTick(() => {
    const container = document.querySelector('.number-container') as HTMLElement
    const containerRect = container.getBoundingClientRect()
    const centerY = containerRect.top + containerRect.height / 2

    let closestElement: HTMLElement | null = null
    let closestDistance = Infinity

    numberRefs.value.forEach((numberRef, index) => {
      if (numberRef) {
        const rect = numberRef.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - centerY)

        if (distance < closestDistance && numbers.value[index] !== undefined) {
          closestDistance = distance
          closestElement = numberRef
          selectedNumber.value = numbers.value[index]
        }
      }
    })

    if (closestElement) {
      selectNumber(selectedNumber.value!)
      emit('numberSelected', selectedNumber.value)
    }
  })
}

// Scroll a clicked number to the center
const scrollToNumber = (number: number) => {
  // Check [Comment 1] above. Because of the rendering bug, i had to use number - 1
  // Will not explore for now as I have other things to do but if you encounter this,
  // try exploring it.
  const targetElement = numberRefs.value[number - 1]
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    selectNumber(number)
  }
}

// Attach debounced scroll detection
onMounted(() => {
  const container = document.querySelector('.number-container') as HTMLElement
  container.addEventListener('scroll', debounce(detectCenteredNumber, 200)) // Adjust delay as needed
})
</script>


<style scoped>
.autopick-container {
  min-width: 70px;
  max-width: 80px;
  width: 100%;
  border-radius: 10px;
  position: relative;
}

.number-container {
  background: #846ccf;
  border-radius: 8px 10px 0 0;

  width: 100%;
  height: 300px;
  

  overflow: auto;
  scroll-snap-type: y mandatory;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  --scroll-gap: 5px;
  padding: 0 0;

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
  font-weight: 600;
  height: 50px;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100px;
  width: 100%;
  user-select: none;
}

.number .filler {
  height: 50px; /* Match the size of number elements */
  scroll-snap-align: start; /* Align to prevent selection */
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
  cursor: pointer;
  user-select: none;
  transition: transform 0ms, opacity 1000ms, background 300ms;
}

.autopick-btn img {
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.autopick-btn:enabled:hover:active {
  transform: scale(1.05);
}

.autopick-btn:enabled:hover {
  background: #7540c1;
}

.autopick-btn:disabled {
  opacity: 0.7;
}

.autopick-btn:disabled:hover {
  cursor: not-allowed;
}

.gradient {
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(132, 108, 207, 1) 0%,
    rgba(132, 108, 207, 0.5) 25%,
    rgba(133, 108, 207, 0) 50%,
    rgba(133, 108, 207, 0.5) 75%,
    rgba(132, 108, 207, 1) 100%
  );
  border: 5px solid #e7cfff;
  border-bottom: none;
  border-radius: 8px 10px 0 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: calc(100% - 300px);
  pointer-events: none;
}

</style>
