
import { ref, reactive, computed, onMounted } from "vue";
import { 
  generateWorkPromptsArrayFromString,
  generateWorkPromptsStringFromArray,
  checkCurrentVersionWorkPromptsArray
} from '~/js/common/prompt';
import { 
  getOriginalPrompts as getOriginalPromptsStorage,
  setOriginalPrompts as setOriginalPromptsStorage, 
  getWorkPromptsArray as getWorkPromptsArrayStorage, 
  removeWorkPromptsArray as  removeWorkPromptsArrayStorage
} from '~/js/common/storage';
 
export function useEnhancer() {
  const originalPrompts = ref("");
  let workPromptsArray = reactive([]);

  const updateOriginalPrompts = (value) => {
    // Update originalPrompts
    originalPrompts.value = value;
    setOriginalPromptsStorage(value);
    // Update WorkPromptsArray
    workPromptsArray.splice(0);
    workPromptsArray.push(...generateWorkPromptsArrayFromString(value));
    removeWorkPromptsArrayStorage();
  };

  const workPrompts = computed(() => {
    return generateWorkPromptsStringFromArray(workPromptsArray);
  });

  const resetWorkPrompts = (() => {
    updateOriginalPrompts(originalPrompts.value);
  });

  const syncWorkToOriginPrompts = (() => {
    updateOriginalPrompts(workPrompts.value);
  });

  const inputChangeOriginalPrompts = (event) => {
    updateOriginalPrompts(event.target.value);
  };

  onMounted(async () => {
    originalPrompts.value = await getOriginalPromptsStorage() || "";
    // storage cache or generate from originalPrompts 
    const cacheWorkPromptsArray = await getWorkPromptsArrayStorage();
    if (cacheWorkPromptsArray && checkCurrentVersionWorkPromptsArray(cacheWorkPromptsArray)) {
      workPromptsArray.push(...cacheWorkPromptsArray);
    } else {
      workPromptsArray.push(...generateWorkPromptsArrayFromString(originalPrompts.value));
    }
  });

  return {
    originalPrompts,
    workPrompts,
    workPromptsArray,
    resetWorkPrompts,
    syncWorkToOriginPrompts,
    updateOriginalPrompts,
    inputChangeOriginalPrompts
  }
}



