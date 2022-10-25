import { computed } from 'vue';
import { useStore } from 'vuex';
import { MENU } from '~/js/popup/const';
import { 
  getCurrentMenu as getCurrentMenuFromStore
} from '~/js/popup/store';

export function useEnhancer() {
  const store = useStore();

  const currentMenu = computed(() => {
    return getCurrentMenuFromStore(store);
  });

  return {
    MENU,
    currentMenu
  };
}