<template>
  <div class="work-prompts-container">
    <div class="title">
      Working Prompts
    </div>
    <div class="work-prompts">
      <div class="prompts">
        {{ workPrompts }}
      </div>
      <div class="sticky-container">
        <div
          class="copy-icon"
          @click="copyClipboard(workPrompts)"
        />
      </div>
    </div>
  </div>
  <div class="prompts-editor-container">
    <PromptEditor
      v-for="(workPrompt, index) in workPromptsArray"
      :key="getObjectHash({ index, ...workPrompt })"
      :index="index"
      :workPrompt="workPrompt"
      :updateWorkPrompt="updateWorkPrompt"
      :removeWorkPrompt="removeWorkPrompt"
      draggable
      @dragstart="dragStartWorkPrompt(index, $event)"
      @dragend="dragEndWorkPrompt"
      @drop="dropWorkPrompt(index, $event)"
      @dragenter="dragEnterWorkPrompt(index, $event)"
      @dragover.prevent
      @dragenter.prevent
    />
  </div>
  <div class="add-prompt-container">
    <button @click="addWorkPrompt">
      + Add Prompt
    </button>
  </div>
</template>
 
<script>


import PromptEditor from "./PromptEditor";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    PromptEditor
  },
  props: {
    workPrompts: {
      type: String,
      required: true,
    },
    workPromptsArray: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    return useEnhancer(props);
  }
}
</script>
 
<style lang="scss" scoped>
  .work-prompts-container {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .title {
      font-size: 16px;
    }
    .work-prompts {
      position: relative;
      width: 100%;
      height: 100px;
      background-color: #f5f5f5;
      border: 1px solid gray;
      overflow-y: scroll;
      box-sizing: border-box;

      .prompts {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        padding: 2px 4px;
        font-size: 16px;
      }

      .sticky-container {
        position: sticky;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;

        .copy-icon {
          position: absolute;
          bottom: 6px;
          right: 6px;
          display: inline-block;
          background-image: url("~/src/image/icons/copy.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
      }
    }
  }
  .prompts-editor-container{
    display: flex;
    flex-wrap: wrap;
  }

  .add-prompt-container {
    button {
      width: 100%;
      font-size: 14px;
      font-weight: 700;
      padding: 4px;
      background: white;
      border: 1px solid gray;
      cursor: pointer;
    }
  }
  
</style>