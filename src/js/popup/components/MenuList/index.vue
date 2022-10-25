<template>
  <div class="menu-list">
    <MenuItem
      v-for="(menuItem, index) in menuList"
      :key="getObjectHash({ index, currentMenu, ...menuItem })"
      :currentMenu="currentMenu"
      :menuItem="menuItem"
      :selectMenu="selectMenu"
    />
  </div>
</template>
 
<script>

import MenuItem from "./MenuItem/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    MenuItem
  },
  setup() {
    return useEnhancer();
  }
}
</script>
 
<style lang="scss" scoped>
  .menu-list {
    position: absolute;
    top: 0;
    right: 16px;
    display: flex;
    gap: 8px;

  }
  
</style>