<template>
  <div class="modal-container">
    <div
      class="overlay"
      @:click="close"
    />
    <div
      class="content"
      @ciick="clickContent"
    >
      <div class="inner">
        <slot>Please set slot.</slot>
      </div>
    </div>
  </div>
</template>
 
<script>
 
export default {
  props: {
    close: {
      type: Function,
      required: true
    }
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>