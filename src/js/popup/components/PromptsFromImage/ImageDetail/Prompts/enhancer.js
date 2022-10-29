import { toRef } from "vue";
import { useStore } from 'vuex';
import { MENU } from '~/js/popup/const';
import { setCurrentMenu as setCurrentMenuToStore } from '~/js/popup/store';
import { 
  setOriginalPrompts as setOriginalPromptsStorage,
  removeWorkPromptsArray as  removeWorkPromptsArrayStorage
} from '~/js/common/storage';

import { copy } from "~/js/common/clipboard";
import { notificate } from "~/js/common/notificate";
 
export function useEnhancer(props) {
  const store = useStore();

  const prompts = toRef(props, "prompts");

  const copyPrompts = async () => {
    await copy(prompts.value);
    notificate("Copied prompts", "completed copy.");
  }

  const editPrompts = () => {
    setOriginalPromptsStorage(prompts.value);
    removeWorkPromptsArrayStorage();
    setCurrentMenuToStore(store, MENU.PROMPTS_EDITOR);
  };

  return {
    copyPrompts,
    editPrompts
  }
}