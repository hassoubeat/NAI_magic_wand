import { toRef, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { setCurrentMenu as setCurrentMenuToStore } from '~/js/popup/store';
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { MENU } from '~/js/popup/const';
import { copy } from "~/js/common/clipboard";
import { notificate } from "~/js/common/notificate";
import { 
  setOriginalPrompts as setOriginalPromptsStorage,
  removeWorkPromptsArray as  removeWorkPromptsArrayStorage
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

  return {
    copyPrompts,
    editPrompts,
    promptsBookmarkArray,
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    addablePromptsBookmark
  }
}