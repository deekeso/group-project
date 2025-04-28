<template>
  <div class="legend-container">
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    user-select: none;
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
    color: #246a72;
    background-color: #4adff0;
    border: 4px solid #00b6ca;
  }

  .missed {
    background: #ff7779;
    color: #4b0405; 
  }

</style>