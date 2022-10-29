<template>
  <div class="image-detail-container">
    <div class="loaded-image-container">
      <img :src="imageSrc"/>
    </div>
    <Prompts
      v-if="prompts"
      :prompts="prompts"
    />
    <div
      v-if="Object.keys(metadataNai).length > 0"
      class="metadata-nai-group-container"
    >
      <div class="title">Other Parameters</div>
      <MetadataNai
        v-for="(value, name) in metadataNai"
        :key="name"
        :name="name"
        :value="value"
      />
    </div>
    <MetadataPng
      v-if="Object.keys(metadataPng).length > 0"
      :metadataPng="metadataPng"
    />
  </div>
</template>
 
<script>

import Prompts from "./Prompts/index.vue";
import MetadataNai from "./MetadataNai/index.vue";
import MetadataPng from "./MetadataPng/index.vue";
 
export default {
  components: {
    Prompts,
    MetadataNai,
    MetadataPng
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