<template>
  <div class="container">
    <div class="menu">
      <div class="title">
        Prompts Editor
      </div>
    </div>
    <input 
      class="original-prompts"
      type="text"
      placeholder="Please input your prompts."
      :value="originalPrompts"
      @input="inputChangeOriginalPrompts"
    >
  </div>
</template>
 
<script>
 
export default {
  props: {
    originalPrompts: {
      type: String,
      required: true,
    },
    inputChangeOriginalPrompts: {
      type: Function,
      required: true,
    }
  },
  setup() {
  }
}
</script>
 
<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .menu {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 20px;
        font-weight: 700;
      }
    }

    .original-prompts {
      padding: 4px;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid gray;
    }
  }
  
</style>