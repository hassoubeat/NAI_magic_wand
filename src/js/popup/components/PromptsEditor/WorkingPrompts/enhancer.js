import { toRef } from 'vue';
import getObjectHash from "object-hash";
import { copy } from "~/js/common/clipboard";
import { notificate } from "~/js/common/notificate";
import { setWorkPromptsArray } from '~/js/common/storage';


export function useEnhancer(props) {
  const workPrompts = toRef(props, "workPrompts"); 
  const { workPromptsArray } = props;

  const addWorkPrompt = () => {
    const newWorkPrompt = [
      ...workPromptsArray,
      {
        originalPrompt: "",
        prompt: "",
        isUse: true,
        countCurlyBracket: 0
      }
    ]
    workPromptsArray.splice(0);
    workPromptsArray.push(...newWorkPrompt);
  };

  const updateWorkPrompt = (index, updateWorkPrompt) => {
    workPromptsArray[index] = updateWorkPrompt;
    setWorkPromptsArray(workPromptsArray);
  }

  const removeWorkPrompt = (index) => {
    workPromptsArray.splice(index, 1);
  }

  let draggingWorkPromptIndex = null;
  let dragEnteringWorkPromptIndex = null;

  const dragStartWorkPrompt = (dragIndex, event) => {
    draggingWorkPromptIndex = dragIndex;
    addWorkPromptDraggingMaker(draggingWorkPromptIndex);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
  }

  const dropWorkPrompt = (dropIndex) => {
    const deleteList = workPromptsArray.splice(draggingWorkPromptIndex, 1);
    workPromptsArray.splice(dropIndex, 0, deleteList[0])
    setWorkPromptsArray(workPromptsArray);
  }

  const dragEndWorkPrompt = () => {
    // reset dragging layout & status
    removeWorkPromptDraggingMaker(draggingWorkPromptIndex);
    clearAllWorkPromptDragEnteringMaker();
    draggingWorkPromptIndex = null;
    dragEnteringWorkPromptIndex = null;
  }

  const dragEnterWorkPrompt = (index) => {
    if (index !== dragEnteringWorkPromptIndex) {
      clearAllWorkPromptDragEnteringMaker();

      if (index === draggingWorkPromptIndex) {
        addWorkPromptDragEnteringMaker(index, "current");
      } else if(index > draggingWorkPromptIndex) {
        addWorkPromptDragEnteringMaker(index, "bottom");
      } else {
        addWorkPromptDragEnteringMaker(index, "top");
      }
      
    }
    dragEnteringWorkPromptIndex = index;
  }

  const copyWorkPromptsToClipboard = async () => {
    await copy(workPrompts.value);
    notificate("Copied WorkPrompts", "completed copy.");
  };

  return {
    getObjectHash,
    addWorkPrompt,
    updateWorkPrompt,
    removeWorkPrompt,
    dragStartWorkPrompt,
    dropWorkPrompt,
    dragEndWorkPrompt,
    dragEnterWorkPrompt,
    copyWorkPromptsToClipboard
  };
}

function addWorkPromptDraggingMaker(index) {
  document.getElementById(`promptEditor${index}`).classList.add("dragging");
}

function removeWorkPromptDraggingMaker(index) {
  document.getElementById(`promptEditor${index}`).classList.remove("dragging");
}

function addWorkPromptDragEnteringMaker(index, makingPosition) {
  document.getElementById(`promptEditor${index}`).classList.add(`drag-entering-${makingPosition}`);
}

function clearAllWorkPromptDragEnteringMaker() {
  const workPrompts = document.querySelectorAll(`[id^='promptEditor']`);
  workPrompts.forEach((workPrompt) => {
    workPrompt.classList.remove("drag-entering-current");
    workPrompt.classList.remove("drag-entering-top");
    workPrompt.classList.remove("drag-entering-bottom");
  });
}