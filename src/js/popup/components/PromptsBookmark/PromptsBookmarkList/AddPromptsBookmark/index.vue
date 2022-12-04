<template>
  <div class="add-bookmark-modal-open-button-container">
    <button
      v-if="promptsBookmarkArray.length < promptsBookmarksLimited"
      @click="openAddBookmarkModal"
    >
      + Add Bookmark ({{ promptsBookmarkArray.length }} / {{ promptsBookmarksLimited }})
    </button>
    <button
      v-if="promptsBookmarkArray.length >= promptsBookmarksLimited"
      disabled
    >
      Up to {{ promptsBookmarksLimited }} bookmarks...
    </button>
  </div>
  <AddPromptsBookmarkModal 
    v-if="visibleAddBookmarkModal"
    :close="closeAddBookmarkModal"
    :promptsBookmarkArray="promptsBookmarkArray"
    :addedCallBack="addedPromptsBookmarkCallback"
  />
</template>
 
<script>

import AddPromptsBookmarkModal from "~/js/popup/components/common/AddPromptsBookmarkModal/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    AddPromptsBookmarkModal
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