<template>
  <div
    :id="`promptEditor${index}`"
    class="container"
    :class="{ editing:isEditing, new:isNew }"
  >
    <div
      class="toggle-use"
      @click="toggleUse"
    >
      <img
        v-if="workPrompt.isUse"
        src="image/icons/eye.png"
      >
      <img
        v-if="!workPrompt.isUse"
        src="image/icons/close-eye.png"
      >
    </div>
    <input
      class="prompt"
      type="text"
      :value="workPrompt.prompt"
      @change="updatePrompt"
    >
    <div 
      v-if="workPrompt.weight >= 0"
      :class="`curly-bracket x${workPrompt.weight}`"
    >
      { }
      <div class="count">
        {{ workPrompt.weight }}
      </div>
    </div>
    <div 
      v-if="workPrompt.weight < 0"
      :class="`square-bracket x${Math.abs(workPrompt.weight)}`"
    >
      [ ]
      <div class="count">
        {{ Math.abs(workPrompt.weight) }}
      </div>
    </div>
    <div class="update-weight">
      <div 
        class="update-button increment"
        @click="incrementWeight"
      />
      <div 
        class="update-button decrement"
        @click="decrementWeight"
      />
    </div>
    <div
      class="remove-prompt"
      @click="removeWorkPrompt(index)"
    />
    <div class="prompt-draggable">
      <img src="image/icons/draggable.png">
    </div>
  </div>
</template>
 
<script>

import { useEnhancer } from "./enhancer";
 
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    workPrompt: {
      type: Object,
      required: true,
    },
    updateWorkPrompt: {
      type: Function,
      required: true,
    },
    removeWorkPrompt: {
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
  @import './style.scss';
</style>