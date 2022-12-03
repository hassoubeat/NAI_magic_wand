import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { ref } from 'vue';
import { bottomToScroll } from "~/js/common/scroll";
import { sleep } from "~/js/common/sleep";
 
export function useEnhancer() {
  const visibleAddBookmarkModal = ref(false);

  const addedPromptsBookmarkCallback = () => {
    sleep(100, bottomToScroll);  
  };

  const openAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = true;
  }
  
  const closeAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = false;
  }

  return {
    addedPromptsBookmarkCallback,
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    promptsBookmarksLimited: PROMPTS_BOOKMARKS_LIMIT
  }
}