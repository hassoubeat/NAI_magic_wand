<template>
  <div class="prompts-bookmark">
    <div class="title">
      Prompts Bookmark
    </div>
    <div class="prompts-bookmark-filter-input-container">
      <div class="search-icon">
        <img src="image/icons/search.png">
      </div>
      <input 
        type="text"
        placeholder="Please input you want to search title of the prompts."
        :value="filterWord"
        @input="inputFilterWord"
      >
    </div>
    <PromptsBookmarkList
      :filterWord="filterWord"
    />
  </div>
</template>
 
<script>

import PromptsBookmarkList from "./PromptsBookmarkList/index.vue";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    PromptsBookmarkList
  },
  setup() {
    return useEnhancer();
  }
}
</script>
 
<style lang="scss" scoped>
  .prompts-bookmark {
    min-height: 150px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .prompts-bookmark-filter-input-container {
      display: flex;
      align-items: center;
      gap: 2px;
      border-bottom: 1px solid gray;
      position: relative;

      .search-icon {
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        text-align: center;
        align-items: center;
        width: 25px;
        height: 25px;

        img {
          width: 100%;
          width: 15px;
          height: 15px;
          margin: 0 auto;
        }
      }

      input {
        width: 100%;
        margin-left: 25px;
        padding: 4px;
        font-size: 16px;
        border: none;
        box-sizing: border-box;
      }
    }
  }
  
</style>