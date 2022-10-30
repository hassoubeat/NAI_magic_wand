<template>
  <div class="image-uploader-container">
    <div
      class="image-input-field"
      :class="{ dragging: isDragging }"
      @dragover.prevent="dragOverImage"
      @dragleave="dragLeaveImage"
      @drop.stop="dropImage"
    >
      <input 
        type="file"
        accept="image/png" 
        @change="selectImage"
      >
      <p>
        Drag & Drop to ".png" image create by NovelAI
        <br>
        or 
        <br>
        Click to select ".png" image create by NovelAI
      </p>
    </div>
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    updateImageSrc: {
      type: Function,
      required: true,
    },
    updatePrompts: {
      type: Function,
      required: true,
    },
    updateNegativePrompts: {
      type: Function,
      required: true,
    },
    updateMetadataNai: {
      type: Function,
      required: true,
    },
    updateMetadataPng: {
      type: Function,
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