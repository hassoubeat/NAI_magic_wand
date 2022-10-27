<template>
  <div class="prompts-bookmark-list">
    <div v-if="promptsBookmarkArray.length === 0">
      No prompts bookmark.<br>
      Let's register your favorite prompts : )
    </div>
    <div v-if="promptsBookmarkArray.length > 0 && filteredPromptsBookmarkArray.length === 0">
      Not found search result...
    </div>
    <PromptsBookmarkItem
      v-for="(item, index) in filteredPromptsBookmarkArray"
      :key="getObjectHash({ index, ...item.promptBookmark })"
      :index="index"
      :originalIndex="item.originalIndex"
      :promptsBookmark="item.promptBookmark"
      :updatePromptsBookmark="updatePromptsBookmark"
      :removePromptsBookmark="removePromptsBookmark"
      :isDraggable="draggable"
      draggable
      @dragstart="dragStartPromptsBookmark(index, $event)"
      @dragend="dragEndPromptsBookmark"
      @drop="dropPromptsBookmark(index, $event)"
      @dragenter="dragEnterPromptsBookmark(index, $event)"
      @dragover.prevent
      @dragenter.prevent
    />
  </div>
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
    :addPromptsBookmark="addPromptsBookmark"
  />
</template>
 
<script>

import AddPromptsBookmarkModal from "~/js/popup/components/common/AddPromptsBookmarkModal/index.vue";
import PromptsBookmarkItem from "./PromptsBookmarkItem/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    AddPromptsBookmarkModal,
    PromptsBookmarkItem
  },
  props: {
    filterWord: {
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
  .prompts-bookmark-list {
    margin-bottom: 40px;
  }

  .add-bookmark-modal-open-button-container {
    position: fixed;
    bottom: 12px;
    left: 0px;
    right: 0px;
    margin: auto 8px;

    button {
      width: 100%;
      font-size: 14px;
      font-weight: 700;
      padding: 4px;
      background: white;
      border: 1px solid gray;
      text-align: center;
      cursor: pointer;

      &:disabled {
        background: silver;
      }
    }
  }
  
</style>