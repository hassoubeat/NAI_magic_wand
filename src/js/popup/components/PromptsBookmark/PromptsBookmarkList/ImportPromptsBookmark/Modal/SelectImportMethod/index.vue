<template>
  <div 
    class="import-method-select"
    @click="selectFunc"
  >
    <input 
      type="radio"
      :checked="isChecked"
    >
    <div>
      <div class="title">
        {{ title }}
      </div>
      <slot />
    </div>
  </div>
</template>
 
<script>
 
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    isChecked: {
      type: Boolean,
      required: true
    },
    selectFunc: {
      type: Function,
      required: true,
    }
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>