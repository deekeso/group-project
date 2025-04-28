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
    width: fit-content;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    user-select: none;
    border-radius: 8px;
    padding: 4px 6px;

  }

  .legend {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 4px 10px;
    border-radius: 8px;
    height: 40px;
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

</style>
