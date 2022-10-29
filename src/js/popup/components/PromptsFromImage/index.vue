<template>
  <div class="prompts-from-image-container">
    <div class="title">Prompts from Image</div>
    <ImageUploader/>
  </div>
</template>
 
<script>

import ImageUploader from "./ImageUploader/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    ImageUploader
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  .prompts-from-image-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  
</style>