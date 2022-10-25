import { computed } from 'vue';

export function useEnhancer(props) {
  const { currentMenu, menuItem, selectMenu } = props;

  const isActive =  computed(() => {
    return menuItem.identifer === currentMenu;
  });
  
  const clickMenu = () => {
    selectMenu(menuItem.identifer);
  };

  return {
    isActive,
    clickMenu
  }
}