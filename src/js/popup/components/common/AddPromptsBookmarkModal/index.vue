<template>
  <Modal
    :close="close"
  >
    <div class="add-bookmark-container">
      <div class="title">
        Add Prompts Bookmark
      </div>
      <div class="input-container">
        <div class="input-title">
          <input 
            type="text"
            placeholder="title"
            :value="title"
            @input="inputTitle"
          >
        </div>
        <div class="input-prompts">
          <textarea
            placeholder="prompts"
            :value="prompts"
            :readonly="readonlyPrompts"
            @input="inputPrompts"
          />
        </div>
        <div class="action-button-list">
          <button
            class="cancel"
            @click="close"
          >
            Cancel
          </button>
          <button
            class="primary"
            @click="addPromptsBookmark"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
 
<script>

import Modal from "~/js/popup/components/common/Modal/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    Modal
  },
  props: {
    close: {
      type: Function,
      required: true
    },
    promptsBookmarkArray: {
      type: Array,
      required: true,
    },
    intialPrompts: {
      type: String,
      required: false,
      default: ""
    },
    readonlyPrompts: {
      type: Boolean,
      required: false,
    },
    addedCallBack: {
      type: Function,
      required: false,
      default: undefined
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