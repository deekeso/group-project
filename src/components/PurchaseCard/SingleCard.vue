<template>
  <div class="option-shadow">
    <div class="single-card option">
      <h2>Single Card</h2>
      <div class="image-container">
        <img src="../../assets/single-card/card.png" alt="keno card" class="card-img" />
        <img src="../../assets/single-card/ball.png" alt="keno ball" class="ball-img sb" />
      </div>
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
.sb {
  position: absolute;
  bottom: 0;
  left: 40px;
}
</style>
