<template>
  <div class="image-detail-container">
    <div class="loaded-image-container">
      <img :src="imageSrc"/>
    </div>
    <div class="loaded-prompts-container">
      <div class="title">
        Prompts
      </div>
      <div class="prompts">
        {{ prompts }}
      </div>
    </div>
    {{ metadataNai }},
    {{ metadataPng }}
  </div>
</template>
 
<script>
 
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    prompts: {
      type: String,
      required: true,
    },
    metadataNai: {
      type: Object,
      required: true,
    },
    metadataPng: {
      type: Object,
      required: true,
    }
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  @import './style.scss';
</style>