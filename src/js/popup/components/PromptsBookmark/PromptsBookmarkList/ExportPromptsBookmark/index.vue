<template>
  <button
    :disabled="promptsBookmarkArray.length <= 0"
    @click="exportBookmarks"
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
  setup(props) {
    return useEnhancer(props);
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>