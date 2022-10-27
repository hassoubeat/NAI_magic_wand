import { ref, reactive, computed, onMounted } from 'vue';
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { notificate } from "~/js/common/notificate";
import { 
  getPromptsBookmarkArray as getPromptsBookmarkArrayFromStorage,
  setPromptsBookmarkArray as setPromptsBookmarkArrayToStorage
} from '~/js/common/storage';

export function useEnhancer() {
  const visibleAddBookmarkModal = ref(false);
  let promptsBookmarkArray = reactive([]);

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

  onMounted(async () => {
    promptsBookmarkArray.push(...await getPromptsBookmarkArrayFromStorage());
  });

  return {
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    addPromptsBookmark,
    addablePromptsBookmark
  };
}