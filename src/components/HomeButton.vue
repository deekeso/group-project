<template>
  <div class="button-container" @click="$emit('home')">
    <svg class="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.home-icon {
  height: 30px;
  color: black;
}
.button-container {
  background: #ffffff;
  border-radius: 100px;
  padding-block: 10px;
  padding-inline: 40px;
  width: fit-content;
}
.button-container:hover {
  background: rgba(255, 255, 255, 0.87);
}
.button-container:active {
  background: #ffe387;
}
</style>
