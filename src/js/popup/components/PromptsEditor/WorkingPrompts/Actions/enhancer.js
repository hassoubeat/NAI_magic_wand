import { ref, reactive, computed, onMounted } from 'vue';
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { notificate } from "~/js/common/notificate";
import { 
  getPromptsBookmarkArray as getPromptsBookmarkArrayFromStorage
} from '~/js/common/storage';

export function useEnhancer() {
  const visibleAddBookmarkModal = ref(false);
  const promptsBookmarkArray = reactive([]);

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

  onMounted(async () => {
    promptsBookmarkArray.push(...await getPromptsBookmarkArrayFromStorage());
  });

  return {
    promptsBookmarkArray,
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    addablePromptsBookmark
  };
}