
import getObjectHash from "object-hash";
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { toRef, ref, reactive, computed, watch, onMounted } from 'vue';
import { 
  getPromptsBookmarkArray as getPromptsBookmarkArrayFromStorage,
  setPromptsBookmarkArray as setPromptsBookmarkArrayToStorage
} from '~/js/common/storage';
import { notificate } from "~/js/common/notificate";
import { bottomToScroll } from "~/js/common/scroll";
import { sleep } from "~/js/common/sleep";
 
export function useEnhancer(props) {
  const filterWord = toRef(props, "filterWord");
  const visibleAddBookmarkModal = ref(false);
  let promptsBookmarkArray = reactive([]);

  const filteredPromptsBookmarkArray = computed(() => {
    const reg = new RegExp(filterWord.value);
    return promptsBookmarkArray.flatMap(( promptBookmark, index) => {
      const filteredPromptsBookmark = {
        originalIndex: index,
        promptBookmark
      }
      return reg.test(promptBookmark.title) ? filteredPromptsBookmark : [];
    });
  });

  const addedPromptsBookmarkCallback = () => {
    sleep(100, bottomToScroll);  
  };

  const updatePromptsBookmark = (index, updatePromptsBookmark) => {
    promptsBookmarkArray[index] = updatePromptsBookmark;
  }

  const removePromptsBookmark = (index) => {
    promptsBookmarkArray.splice(index, 1);
  }

  watch(promptsBookmarkArray, (next) => {
    setPromptsBookmarkArrayToStorage(next);
  });

  const openAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = true;
  }
  
  const closeAddBookmarkModal = () => {
    visibleAddBookmarkModal.value = false;
  }

  // drag process

  const draggable = computed(() => {
    return filterWord.value === "";
  });

  let draggingPromptsBookmarkIndex = null;
  let dragEnteringPromptsBookmarkIndex = null;

  const dragStartPromptsBookmark = (dragIndex, event) => {
    draggingPromptsBookmarkIndex = dragIndex;
    addPromptsBookmarkDraggingMaker(draggingPromptsBookmarkIndex);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
  }

  const dropPromptsBookmark = (dropIndex) => {
    const deleteList = promptsBookmarkArray.splice(draggingPromptsBookmarkIndex, 1);
    promptsBookmarkArray.splice(dropIndex, 0, deleteList[0])
  }

  const dragEndPromptsBookmark = () => {
    // reset dragging layout & status
    removePromptsBookmarkDraggingMaker(draggingPromptsBookmarkIndex);
    clearAllPromptsBookmarkDragEnteringMaker();
    draggingPromptsBookmarkIndex = null;
    dragEnteringPromptsBookmarkIndex = null;
  }

  const dragEnterPromptsBookmark = (index) => {
    if (index !== dragEnteringPromptsBookmarkIndex) {
      clearAllPromptsBookmarkDragEnteringMaker();

      if (index === draggingPromptsBookmarkIndex) {
        addPromptsBookmarkDragEnteringMaker(index, "current");
      } else if(index > draggingPromptsBookmarkIndex) {
        addPromptsBookmarkDragEnteringMaker(index, "bottom");
      } else {
        addPromptsBookmarkDragEnteringMaker(index, "top");
      }
      
    }
    dragEnteringPromptsBookmarkIndex = index;
  }

  onMounted(async () => {
    promptsBookmarkArray.push(...await getPromptsBookmarkArrayFromStorage());
  });

  return {
    promptsBookmarkArray,
    filteredPromptsBookmarkArray,
    addedPromptsBookmarkCallback,
    updatePromptsBookmark,
    removePromptsBookmark,
    visibleAddBookmarkModal,
    openAddBookmarkModal,
    closeAddBookmarkModal,
    draggable,
    dragStartPromptsBookmark,
    dropPromptsBookmark,
    dragEndPromptsBookmark,
    dragEnterPromptsBookmark,
    getObjectHash,
    promptsBookmarksLimited: PROMPTS_BOOKMARKS_LIMIT
  }
}

function addPromptsBookmarkDraggingMaker(index) {
  document.getElementById(`promptBookmark${index}`).classList.add("dragging");
}

function removePromptsBookmarkDraggingMaker(index) {
  document.getElementById(`promptBookmark${index}`).classList.remove("dragging");
}

function addPromptsBookmarkDragEnteringMaker(index, makingPosition) {
  document.getElementById(`promptBookmark${index}`).classList.add(`drag-entering-${makingPosition}`);
}

function clearAllPromptsBookmarkDragEnteringMaker() {
  const promptsBookmarks = document.querySelectorAll(`[id^='promptBookmark']`);
  promptsBookmarks.forEach((promptsBookmark) => {
    promptsBookmark.classList.remove("drag-entering-current");
    promptsBookmark.classList.remove("drag-entering-top");
    promptsBookmark.classList.remove("drag-entering-bottom");
  });
}