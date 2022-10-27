<template>
  <div class="action-container">
    <div 
      class="button add-prompt" 
      @click="addWorkPrompt"
    >
      <img src="image/icons/plus.png">
    </div>
  </div>
</template>
 
<script>
 
export default {
  props: {
    addWorkPrompt: {
      type: Function,
      required: true,
    },
    copyWorkPromptsToClipboard: {
      type: Function,
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