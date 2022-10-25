import { createStore } from 'vuex';
import { 
  setCurrentMenu as setCurrentMenuToStorage
} from '~/js/common/storage';

const store = createStore({
  state: {
    currentMenu: ""
  },
  mutations: {
    setCurrentMenu(state, menuIdentifer){
      state.currentMenu = menuIdentifer;
    }
  }
});

export default store

export function getCurrentMenu(store) {
  return store.state.currentMenu;
}

export function setCurrentMenu(store, value) {
  store.commit("setCurrentMenu", value);
  setCurrentMenuToStorage(value);
}

