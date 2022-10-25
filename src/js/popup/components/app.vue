<template>
  <MenuList />
  <PromptsEditor v-if="MENU.PROMPTS_EDITOR === currentMenu" />
  <PromptsBookmark v-if="MENU.PROMPTS_BOOKMARK === currentMenu" />
</template>
 
<script>

import MenuList from './MenuList/index.vue';
import PromptsEditor from './PromptsEditor/index.vue';
import PromptsBookmark from './PromptsBookmark/index.vue';
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    MenuList,
    PromptsEditor,
    PromptsBookmark
  },
  setup() {
    return useEnhancer();
  }
}
</script>
 
<style lang="scss" scoped>
</style>