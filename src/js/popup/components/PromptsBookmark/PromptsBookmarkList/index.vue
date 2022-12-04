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
    <div class="prompts-bookmark-io-menu">
      <ImportPromptsBookmark
        :promptsBookmarkArray="promptsBookmarkArray"
      />
      <ExportPromptsBookmark
        :promptsBookmarkArray="promptsBookmarkArray"
      />
    </div>
  </div>
  <AddPromptsBookmark
    :promptsBookmarkArray="promptsBookmarkArray"
  />
</template>
 
<script>

import PromptsBookmarkItem from "./PromptsBookmarkItem/index.vue";
import ImportPromptsBookmark from "./ImportPromptsBookmark/index.vue";
import ExportPromptsBookmark from "./ExportPromptsBookmark/index.vue";
import AddPromptsBookmark from "./AddPromptsBookmark/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    PromptsBookmarkItem,
    ImportPromptsBookmark,
    ExportPromptsBookmark,
    AddPromptsBookmark
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
  @import './style.scss';
</style>