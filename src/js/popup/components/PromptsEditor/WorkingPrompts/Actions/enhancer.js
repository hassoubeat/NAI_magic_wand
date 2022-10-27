import { ref } from 'vue';

export function useEnhancer() {
  const visibleAddBookmarkModal = ref(false);

  const openAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = true;
  }
  
  const closeAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = false;
  }

  return {
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal
  };
}