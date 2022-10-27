import { ref } from "vue";

export function useEnhancer(props) {
  const { close, addPromptsBookmark } = props

  const title = ref("");
  const prompts = ref("");

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