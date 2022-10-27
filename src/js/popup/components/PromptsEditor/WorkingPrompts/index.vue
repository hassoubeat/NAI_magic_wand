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
          @click="copyWorkPromptsToClipboard"
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
  <Actions
    :addWorkPrompt="addWorkPrompt"
    :copyWorkPromptsToClipboard="copyWorkPromptsToClipboard"
  />
</template>
 
<script>


import PromptEditor from "./PromptEditor";
import Actions from "./Actions";
import { useEnhancer } from "./enhancer";
 
export default {
  components: {
    PromptEditor,
    Actions
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
  @import './style.scss';
</style>