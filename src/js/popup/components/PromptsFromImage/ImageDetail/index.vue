<template>
  <div class="image-detail-container">
    <div class="loaded-image-container">
      <img :src="imageSrc"/>
    </div>
    <Prompts
      :prompts="prompts"
    /> 
    {{ metadataNai }},
    {{ metadataPng }}
  </div>
</template>
 
<script>

import Prompts from "./Prompts/index.vue";
 
export default {
  components: {
    Prompts
  },
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