<template>
  <div class="option-shadow">
    <div class="multiple-card option">
      <h2>Multiple Cards</h2>
      <div class="image-container">
        <img src="../../assets/multiple-card/card1.png" alt="keno card" class="card-img mc1" />
        <img src="../../assets/multiple-card/card2.png" alt="keno card" class="card-img mc2" />
        <img src="../../assets/multiple-card/ball1.png" alt="keno card" class="ball-img mb1" />
        <img src="../../assets/multiple-card/ball2.png" alt="keno card" class="ball-img mb2" />
      </div>
      <el-text>₱20.00+</el-text>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #f8ab00;
  font-weight: bold;
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
.option:hover {
  -webkit-box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
  -moz-box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
  box-shadow: inset 0px 0px 0px 3px rgba(248, 171, 0, 1);
}
.option-shadow:hover {
  -webkit-box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
  -moz-box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
  box-shadow: 0px 0px 22px 2px rgba(248, 171, 0, 1);
}
.image-container {
  position: relative;
  width: fit-content;
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
