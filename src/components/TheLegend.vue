<template>
  <div class="legend-container">
    <div class="legend title">
      <span>Legend:</span>
    </div>
    <div class="legend unselected">
      <span>Unselected</span>
    </div>
    <div class="legend selected">
      <span>Selected</span>
    </div>
    <div class="legend matched">
      <span>Matched</span>
    </div>
    <div class="legend missed">
      <span>Missed</span>
    </div>
  </div>
</template>

<style scoped>
.legend-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  user-select: none;
  border-radius: 8px;
  padding: 4px 6px;
  column-gap: 20px;
  row-gap: 8px;
}

.legend {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  height: 40px;
  max-width: max-content;
}

.legend span {
  font-weight: 600;
}

.title {
  color: white;
  font-weight: 600;
}

.unselected {
  color: white;
  background-color: #846ccf;
  font-weight: 600;
}

.selected {
  color: white;
  background-color: #846ccf;
  border: 4px solid #e7cfff;
}

.matched {
  color: #094201;
  background-color: #37eb1f;
  border: 4px solid #37eb1f;
}

.missed {
  background: #ff7779;
  color: #4b0405;
}

/* Extra small devices (phones) */
@media (max-width: 576px) {
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  .legend {
    height: 30px;
    padding: 2px 4px;
  }
  
  .legend span {
    font-size: 0.8rem;
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
