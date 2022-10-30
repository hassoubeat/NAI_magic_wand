import { toRef, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { setCurrentMenu as setCurrentMenuToStore } from '~/js/popup/store';
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { MENU } from '~/js/popup/const';
import { copy } from "~/js/common/clipboard";
import { notificate } from "~/js/common/notificate";
import { 
  setOriginalPrompts as setOriginalPromptsStorage,
  removeWorkPromptsArray as  removeWorkPromptsArrayStorage,
  setPromptsBookmarkArray as setPromptsBookmarkArrayToStorage
} from '~/js/common/storage';
 
export function useEnhancer(props) {
  const store = useStore();

  const prompts = toRef(props, "prompts");
  const { promptsBookmarkArray } = props;
  const visibleAddBookmarkModal = ref(false);

  const copyPrompts = async () => {
    await copy(prompts.value);
    notificate("Copied prompts", "completed copy.");
  }

  const editPrompts = () => {
    setOriginalPromptsStorage(prompts.value);
    removeWorkPromptsArrayStorage();
    setCurrentMenuToStore(store, MENU.PROMPTS_EDITOR);
  };

  const addablePromptsBookmark = computed(() => {
    return promptsBookmarkArray.length < PROMPTS_BOOKMARKS_LIMIT;
  });

  const openAddBookmarkModal = () => {
    if (addablePromptsBookmark.value) {
      visibleAddBookmarkModal.value = true;
    } else {
      notificate("Cannot add PromptsBookmark", `Up to ${PROMPTS_BOOKMARKS_LIMIT} bookmarks...`);
    }
  }
  
  const closeAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = false;
  }

  const addPromptsBookmark = (title, prompts) => {
    const newPromptsBookmark = [
      ...promptsBookmarkArray,
      { 
        title, 
        prompts,
        visibleDetail: false
      }
    ]
    promptsBookmarkArray.splice(0);
    promptsBookmarkArray.push(...newPromptsBookmark);
    setPromptsBookmarkArrayToStorage(promptsBookmarkArray);
    notificate("Added PromptsBookmark", `"${title}" bookmark.`);
  };

  return {
    copyPrompts,
    editPrompts,
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    addPromptsBookmark,
    addablePromptsBookmark
  }
}