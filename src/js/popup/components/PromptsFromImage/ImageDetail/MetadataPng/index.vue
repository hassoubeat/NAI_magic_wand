<template>
  <div class="metadata-png-container">
    <div
      class="toggle-visible-accordion"
      :class="{ visible: visibleDetail }"
      @click="toggleVisibleDetail"
    >
      <img src="image/icons/arrow.png">
    </div>
    <div class="title">
      All Metadata
    </div>
  </div>
  <div
    v-if="visibleDetail"
    class="accordion"
  >
    {{ metadataPngString }}
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    metadataPng: {
      type: Object,
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