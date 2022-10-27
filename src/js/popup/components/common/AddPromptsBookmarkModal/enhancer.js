import { toRef, ref } from "vue";

export function useEnhancer(props) {
  const { close, addPromptsBookmark } = props
  const intialPrompts = toRef(props, "intialPrompts");

  const title = ref("");
  const prompts = ref(intialPrompts.value || "");

  const inputTitle = (event) => {
    title.value = event.target.value;
  }

  const inputPrompts = (event) => {
    prompts.value = event.target.value;
  }

  const addBookmark = () => {
    addPromptsBookmark(title.value, prompts.value);
    close();
  }

  return {
    title,
    prompts,
    inputTitle,
    inputPrompts,
    addBookmark
  };
}