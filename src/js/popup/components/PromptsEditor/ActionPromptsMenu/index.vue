<template>
  <div class="container">
    <button
      class="reset"
      @click="resetWork"
    >
      Reset
    </button>
    <button
      class="sync"
      @click="syncWorkToOrigin"
    >
      Update
    </button>
  </div>
</template>
 
<script>
 
export default {
  props: {
    resetWork: {
      type: Function,
      required: true,
    },
    syncWorkToOrigin: {
      type: Function,
      required: true,
    }
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  .container {
    display: flex;
    gap: 16px;
    justify-content: center;

    button {
      display: block;
      font-size: 14px;
      font-weight: 700;
      border: 1px solid gray;
      width: 120px;
      cursor: pointer;
    }

    .reset {
      position: relative;
      background-color: white;
      
      &::before {
        content: "";
        display: inline-block;
        position: relative;
        background-image: url("~/src/image/icons/arrow.png");
        background-repeat: no-repeat;
        background-size: cover;
        width: 10px;
        height: 10px;
        transform: rotateZ(90deg);
      }
    }

    .sync {
      background-color: white;

      &::before {
        content: "";
        display: inline-block;
        position: relative;
        background-image: url("~/src/image/icons/arrow.png");
        background-repeat: no-repeat;
        background-size: cover;
        width: 10px;
        height: 10px;
        transform: rotateZ(-90deg);
      }
    }
  }
  
</style>