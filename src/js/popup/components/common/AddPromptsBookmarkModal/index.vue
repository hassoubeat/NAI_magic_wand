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
            @click="addBookmark"
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
    addPromptsBookmark: {
      type: Function,
      required: true,
    },
    intialPrompts: {
      type: Object,
      required: false,
    },
    readonlyPrompts: {
      type: Boolean,
      required: false,
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