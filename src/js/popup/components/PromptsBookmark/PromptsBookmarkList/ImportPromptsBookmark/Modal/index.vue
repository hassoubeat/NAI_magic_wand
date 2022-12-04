<template>
  <Modal
    :close="close"
  >
    <div class="import-bookmarks-container">
      <div class="title">
        Import Prompts Bookmarks
      </div>
      <div class="input-container">
        <SelectImportMethod
          title="Add import"
          :isChecked="importMethod === IMPORT_ADD_METHOD"
          :selectFunc="selectImportAddMethod" 
        >
          Add imported prompts to the end of current bookmarks.
        </SelectImportMethod>
        <SelectImportMethod
          title="Overwrite import"
          :isChecked="importMethod === IMPORT_OVERWRITE_METHOD"
          :selectFunc="selectImportOverwriteMethod" 
        >
          Overwrite current bookmarks with imported prompts.<br>
          <span style="color: red">
            ! Delete all current bookmarks !
          </span>
        </SelectImportMethod>
      </div>
      <div class="action-button-list">
        <button
          class="primary"
          @click="clickImportBookmarksButton"
        >
          Select import JSON file
        </button>
        <input 
          id="inputImportBookmarks"
          type="file"
          accept="application/json"
          style="display:none"
          @change="importBookmarks"
        >
      </div>
      <div
        v-if="importErrorMessage"
        class="import-error"
      >
        {{ importErrorMessage }}
      </div>
    </div>
  </Modal>
</template>
 
<script>

import Modal from "~/js/popup/components/common/Modal/index.vue";
import SelectImportMethod from "./SelectImportMethod/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    Modal,
    SelectImportMethod
  },
  props: {
    close: {
      type: Function,
      required: true
    },
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