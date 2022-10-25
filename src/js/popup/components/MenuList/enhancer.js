
import getObjectHash from "object-hash";
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { 
  getCurrentMenu as getCurrentMenuFromStore,
  setCurrentMenu as setCurrentMenuToStore,
} from '~/js/popup/store';
import { 
  getCurrentMenu as getCurrentMenuFromStorage,
} from '~/js/common/storage';
import { MENU } from '~/js/popup/const';
 
export function useEnhancer() {
  const store = useStore();

  const currentMenu = computed(() => {
    return getCurrentMenuFromStore(store);
  });

  const selectMenu = (menuIdentifer) => {
    setCurrentMenuToStore(store, menuIdentifer);
  };

  onMounted(async () => {
    setCurrentMenuToStore(store, 
      await getCurrentMenuFromStorage() || MENU.PROMPTS_EDITOR
    );
  });

  return {
    currentMenu,
    selectMenu,
    menuList: generateMenuList(),
    getObjectHash
  }
}

function generateMenuList() {
  return [
    {
      identifer: MENU.PROMPTS_EDITOR,
      iconSrc: "image/icons/menu/prompts_editor.png"
    },{
      identifer: MENU.PROMPTS_BOOKMARK,
      iconSrc: "image/icons/menu/prompts_bookmark.png"
    }
  ];
}

