import { toRef, ref } from "vue";
import { 
  setPromptsBookmarkArray as setPromptsBookmarkArrayToStorage
} from '~/js/common/storage';
import { notificate } from "~/js/common/notificate";

export function useEnhancer(props) {
  const { close, promptsBookmarkArray, addedCallBack } = props
  const intialPrompts = toRef(props, "intialPrompts");

  const title = ref("");
  const prompts = ref(intialPrompts.value || "");

  const inputTitle = (event) => {
    title.value = event.target.value;
  }

  const inputPrompts = (event) => {
    prompts.value = event.target.value;
  }

  const addPromptsBookmark = () => {
    const newPromptsBookmark = [
      ...promptsBookmarkArray,
      { 
        title: title.value, 
        prompts: prompts.value,
        visibleDetail: false
      }
    ]
    promptsBookmarkArray.splice(0);
    promptsBookmarkArray.push(...newPromptsBookmark);
    setPromptsBookmarkArrayToStorage(promptsBookmarkArray);
    notificate("Added PromptsBookmark", `"${title.value}" bookmark.`);
    close();
    if (addedCallBack) addedCallBack();
  };

  return {
    title,
    prompts,
    inputTitle,
    inputPrompts,
    addPromptsBookmark
  };
}