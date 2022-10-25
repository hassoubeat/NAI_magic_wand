<template>
  <div
    :id="`promptBookmark${index}`"
    class="container"
  >
    <div class="front-container">
      <div
        class="toggle-visible-accordion"
        :class="{ visible: promptsBookmark.visibleDetail }"
        @click="toggleAccordion"
      >
        <img src="image/icons/arrow.png">
      </div>
      <input
        class="title"
        type="text"
        :value="promptsBookmark.title"
        @change="updateTitle"
      >
      <div
        class="copy-prompts"
        @click="copyPrompts"
      >
        <img src="image/icons/copy.png">
      </div>
      <div
        v-if="isDraggable"
        class="prompts-bookmark-draggable"
      >
        <img src="image/icons/draggable.png">
      </div>
    </div>
    <div
      v-if="promptsBookmark.visibleDetail"
      class="accordion"
    >
      <textarea
        class="prompts-text-area"
        placeholder="prompts"
        :value="promptsBookmark.prompts"
        @change="updatePrompts"
      />
      <div
        class="remove-prompts-bookmark"
        @click="removePromptsBookmark(originalIndex)"
      />
    </div>
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    originalIndex: {
      type: Number,
      required: true
    },
    promptsBookmark: {
      type: Object,
      required: true,
    },
    updatePromptsBookmark: {
      type: Function,
      required: true,
    },
    removePromptsBookmark: {
      type: Function,
      required: true,
    },
    isDraggable: {
      type: Boolean,
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