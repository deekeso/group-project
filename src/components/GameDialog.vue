<template>
  <div class="page-container">
    <div class="card-shadow">
      <div class="card">
        <div class="dialog">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 10px;
  align-content: center;
  justify-items: center;
  text-align: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.card-shadow {
  border-radius: 30px;
  -webkit-box-shadow: 0px 0px 60px 12px rgba(150, 77, 224, 1);
  -moz-box-shadow: 0px 0px 60px 12px rgba(150, 77, 224, 1);
  box-shadow: 0px 0px 60px 12px rgba(150, 77, 224, 1);
}
h1 {
  color: #f8ab00;
  font-weight: bold;
  text-transform: uppercase;
}
.card {
  background-color: #a47cf3;
  width: fit-content;
  padding: 50px;
  border-radius: 30px;

  -webkit-box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
  -moz-box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
  box-shadow: inset 0px 0px 20px 6px rgba(104, 63, 234, 0.56);
}
.dialog {
  background-color: #060351;
  border-radius: 28px;
  padding: 20px;
  background: #060351;
  box-shadow: 0px 0px 25px #f8ab00;
  border-radius: 28px;
  background-image: url(src/assets/game-modals-bg.png);
}

/* Extra small devices (phones) */
@media (max-width: 576px) {
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .page-container {
    transform: scale(0.5);
  }
}

/* Medium devices (small laptops) */
@media (max-width: 992px) {
  /* Styles for small laptops */
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
  /* Styles for desktops */
}

/* Extra large devices (large screens) */
@media (max-width: 1400px) {
  /* Styles for very large screens */
}
</style>
