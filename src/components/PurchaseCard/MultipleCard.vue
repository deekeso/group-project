<template>
  <div class="option-shadow" :class="{ selected: isSelected }" @click="$emit('select')">
    <div class="multiple-card option" :class="{ selected: isSelected }">
      <h2>Multiple Cards</h2>
      <div class="image-container">
        <img src="../../assets/multiple-card/card1.png" alt="keno card" class="card-img mc1" />
        <img src="../../assets/multiple-card/card2.png" alt="keno card" class="card-img mc2" />
        <img src="../../assets/multiple-card/ball1.png" alt="keno card" class="ball-img mb1" />
        <img src="../../assets/multiple-card/ball2.png" alt="keno card" class="ball-img mb2" />
      </div>
      <el-text class="p">₱20.00+</el-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped>
@font-face {
  font-family: SuperDream;
  src: url('src/assets/Fonts/super_dream/Super Dream.ttf');
}
h2 {
  font-family: SuperDream, sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
}
h2,
.p {
  color: #f8ab00;
  font-weight: bold;
}
.p {
  text-align: right;
  width: 100%;
}
.option {
  background-color: #00004d;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
  height: 100%;
}
.option-shadow {
  border-radius: 15px;
}
.option.selected {
  -webkit-box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
  -moz-box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
  box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
}
.option-shadow:hover,
.option-shadow.selected {
  -webkit-box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
  -moz-box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
  box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
}
.image-container {
  position: relative;
  width: 100%;
}
.card-img {
  height: 175px;
}
.ball-img {
  height: 90px;
}
.mc2 {
  margin-left: -70px;
}
.mb1,
.mb2 {
  position: absolute;
  bottom: 0;
}
.mb1 {
  left: 20px;
}
.mb2 {
  left: 90px;
}
</style>
