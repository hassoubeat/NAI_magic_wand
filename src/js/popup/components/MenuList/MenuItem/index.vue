<template>
  <div
    class="menu-item"
    :class="{ active:isActive }"
    @click="clickMenu"
  >
    <img
      class="icon"
      :src="menuItem.iconSrc"
    >
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  components: {},
  props: {
    currentMenu: {
      type: String,
      required: true,
    },
    menuItem: {
      type: Object,
      required: true,
    },
    selectMenu: {
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

  .menu-item {
    padding: 2px;
    border: 1px solid gray;
    border-top: none;
    border-radius: 0 0 4px 4px;
    cursor: pointer;

    &.active {
      border: 3px solid black;
      border-top: none;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }
</style>