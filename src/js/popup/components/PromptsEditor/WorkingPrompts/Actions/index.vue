<template>
  <div class="action-container">
    <div 
      class="button add-prompt" 
      @click="addWorkPrompt"
    >
      <img src="image/icons/plus.png">
    </div>
    <div 
      class="button copy-work-prompts" 
      @click="copyWorkPromptsToClipboard"
    >
      <img src="image/icons/copy.png">
    </div>
    <div 
      class="button add-prompts-bookmark" 
      :class="{ disabled: !addablePromptsBookmark }"
      @click="openAddBookmarkModal"
    >
      <img src="image/icons/bookmark.png">
    </div>
  </div>
  <AddPromptsBookmarkModal
    v-if="visibleAddBookmarkModal"
    :close="closeAddBookmarkModal"
    :addPromptsBookmark="addPromptsBookmark"
    :intialPrompts="workPrompts"
    :readonlyPrompts="true"
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
    workPrompts: {
      type: String,
      required: true
    },
    addWorkPrompt: {
      type: Function,
      required: true,
    },
    copyWorkPromptsToClipboard: {
      type: Function,
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