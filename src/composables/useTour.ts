import { ref } from 'vue'
import dragonHello from '../assets/dragon_hello.png'

const open = ref(false)
const currentStep = ref(0)

const tourSteps = ref([
  {
    target: '.keno-grid',
    title: 'Select Your Number',
    description:
      'In Classic Keno you can choose up to 15 numbers out of 80 and in Mini Keno you can choose up to 10 numbers out of 49 numbers.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.autopick-container',
    title: 'Auto Pick',
    description:
      'Scroll to choose how many numbers to bet on, and the system will automatically select them for you.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.clear-btn',
    title: 'Clear Selected Number',
    description: 'You can press the clear button to remove all selected numbers.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.wager-container',
    title: 'Your Wager Amount',
    description:
      'This section displays how much your going to wage. There are multiple ways in entering you wager.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.minus-icon',
    title: 'Decrease Wager',
    description:
      'You can press the minus button to decrease your wager. Press and hold to 	gradually lower your wager.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.plus-icon',
    title: 'Increase Wager',
    description:
      'You can press the plus button to increase your wager. Press and hold to 	gradually increase your wager.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.wager-slider',
    title: 'Wager Slider',
    description:
      'Adjust the wager by sliding the bar—move right to raise the amount, left to lower it.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.half-btn',
    title: 'Half Wager',
    description: 'You can press the ÷2 button to half your wager.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.double-btn',
    title: 'Double Wager',
    description: 'You can press the ×2 button to double your wager.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.play-btn',
    title: 'Play Game',
    description:
      'This will start the game. The system will draw 20 numbers in classic and 10 numbers in mini.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.cells-container',
    title: 'Payout',
    description:
      'This section displays how many matched (hits) numbers and its corresponding payout.',
    img: dragonHello,
    placement: 'top',
  },
  {
    target: '.wallet-btn',
    title: 'Wallet',
    description:
      'This is your wallet. It shows your current balance. Tap it to go to the wallet page, where you can deposit or withdraw money',
    img: dragonHello,
    placement: 'bottom',
  },
])

const nextStep = () => {
  if (currentStep.value < tourSteps.value.length - 1) {
    currentStep.value++
  } else {
    open.value = false
  }
}

const startTour = () => {
  currentStep.value = 0
  open.value = true
}

export function useTour() {
  return { open, currentStep, tourSteps, nextStep, startTour }
}
