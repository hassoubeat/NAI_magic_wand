<template>
  <div class="prompts-editor-container">
    <OriginalPrompts
      :originalPrompts="originalPrompts"
      :inputChangeOriginalPrompts="inputChangeOriginalPrompts"
    />
    <ActionPromptsMenu
      v-if="originalPrompts"
      :resetWork="resetWorkPrompts"
      :syncWorkToOrigin="syncWorkToOriginPrompts"
    />
    <WorkingPrompts
      v-if="originalPrompts"
      :workPrompts="workPrompts"
      :workPromptsArray="workPromptsArray"
    />
  </div>
</template>
 
<script>

import OriginalPrompts from "./OriginalPrompts/index.vue";
import ActionPromptsMenu from "./ActionPromptsMenu/index.vue";
import WorkingPrompts from "./WorkingPrompts/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    OriginalPrompts,
    ActionPromptsMenu,
    WorkingPrompts
  },
  setup() {
    const enhanceProps = useEnhancer();
    return enhanceProps;
  }
}
</script>
 
<style lang="scss" scoped>
  .prompts-editor-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
</style>