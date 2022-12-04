import { ref } from 'vue';
 
export function useEnhancer() {
  const visibleImportBookmarksModal = ref(false);

  const openImportBookmarksModal = () => {
    visibleImportBookmarksModal.value = true;
  }
  
  const closeImportBookmarksModal = () => {
    visibleImportBookmarksModal.value = false;
  }

  return { 
    visibleImportBookmarksModal,
    openImportBookmarksModal,
    closeImportBookmarksModal
  }
}