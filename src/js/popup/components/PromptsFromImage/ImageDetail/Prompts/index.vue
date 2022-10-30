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
        class="button add-prompts-bookmark" 
        :class="{ disabled: !addablePromptsBookmark }"
        @click="openAddBookmarkModal"
      >
        <img src="image/icons/bookmark.png">
      </div>
      <div 
        class="button copy-prompts" 
        @click="copyPrompts"
      >
        <img src="image/icons/copy.png">
      </div>
    </div>
  </div>
  <AddPromptsBookmarkModal
    v-if="visibleAddBookmarkModal"
    :close="closeAddBookmarkModal"
    :promptsBookmarkArray="promptsBookmarkArray"
    :intialPrompts="prompts"
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
    title: {
      type: String,
      required: true,
    },
    prompts: {
      type: String,
      required: true,
    },
    promptsBookmarkArray: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    return useEnhancer(props);
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>