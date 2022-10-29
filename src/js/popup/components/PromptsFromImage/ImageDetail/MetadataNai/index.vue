<template>
  <div class="metadata-nai-container">
    <div class="name">{{ name }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>
 
<script>
 
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    }
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>