<script setup lang="ts">
// Component logic here
import { ref, onMounted } from 'vue'

// Props definition
interface Props {
  title?: string
}

// Define props with default values
const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title'
})

// Emits definition
const emit = defineEmits<{
  (e: 'update:title', value: string): void
}>()

// Reactive state
const count = ref(0)

// Methods
const increment = () => {
  count.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div class="base-component">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
.base-component {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 1rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style> 