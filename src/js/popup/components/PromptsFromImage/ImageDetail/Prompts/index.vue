<template>
  <div class="loaded-prompts-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="prompts">
      {{ prompts }}
    </div>
    <div class="actions">
      <div 
        class="button edit-prompts" 
        @click="editPrompts"
      >
        <img src="image/icons/edit.png">
      </div>
      <div 
        class="button copy-prompts" 
        @click="copyPrompts"
      >
        <img src="image/icons/copy.png">
      </div>
    </div>
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    prompts: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    return useEnhancer(props);
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>