import { reactive, onMounted } from 'vue';
import { 
  getPromptsBookmarkArray as getPromptsBookmarkArrayFromStorage
} from '~/js/common/storage';
 
export function useEnhancer() {
  const promptsBookmarkArray = reactive([]);

  onMounted(async () => {
    promptsBookmarkArray.push(...await getPromptsBookmarkArrayFromStorage());
  });

  return { promptsBookmarkArray }
}