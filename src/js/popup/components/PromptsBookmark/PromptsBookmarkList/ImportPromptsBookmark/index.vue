<template>
  <button
    @click="openImportBookmarksModal"
  >
    Import Bookmarks
  </button>
  <ImportBookmarksModal 
    v-if="visibleImportBookmarksModal"
    :close="closeImportBookmarksModal"
    :promptsBookmarkArray="promptsBookmarkArray"
  />
</template>

<script>

import ImportBookmarksModal from "./Modal/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    ImportBookmarksModal
  },
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