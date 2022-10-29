<template>
  <div class="prompts-from-image-container">
    <div class="title">Prompts from Image</div>
    <ImageUploader
      :updateImageSrc="updateImageSrc"
      :updatePrompts="updatePrompts"
      :updateMetadataNai="updateMetadataNai"
      :updateMetadataPng="updateMetadataPng"
    />
    <ImageDetail
      v-if="imageSrc"
      :imageSrc="imageSrc"
      :prompts="prompts"
      :metadataNai="metadataNai"
      :metadataPng="metadataPng"
    />
  </div>
</template>
 
<script>

import ImageUploader from "./ImageUploader/index.vue";
import ImageDetail from "./ImageDetail/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    ImageUploader,
    ImageDetail
  },
  setup() {
    return useEnhancer();
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>