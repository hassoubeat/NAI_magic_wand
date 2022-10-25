import { ref, onMounted } from 'vue';
import { 
  getPromptsBookmarkFilterWord as getPromptsBookmarkFilterWordFromStorage,
  setPromptsBookmarkFilterWord as setPromptsBookmarkFilterWordFromStorage
} from '~/js/common/storage';
 
export function useEnhancer() {
  const filterWord = ref("");

  const inputFilterWord = (event) => {
    filterWord.value = event.target.value;
    setPromptsBookmarkFilterWordFromStorage(event.target.value);
  };

  onMounted(async () => {
    filterWord.value = await getPromptsBookmarkFilterWordFromStorage() || "";
  });

  return {
    filterWord,
    inputFilterWord
  }
}