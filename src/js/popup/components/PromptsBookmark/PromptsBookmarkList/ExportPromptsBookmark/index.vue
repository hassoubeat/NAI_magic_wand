<template>
  <button
    :disabled="promptsBookmarkArray.length <= 0"
  >
    Export bookmarks
  </button>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    promptsBookmarkArray: {
      type: Array,
      required: true,
    }
  },
  setup() {
    return useEnhancer();
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>