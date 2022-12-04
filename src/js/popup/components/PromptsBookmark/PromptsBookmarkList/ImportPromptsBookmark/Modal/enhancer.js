import { ref } from "vue";
import { PROMPTS_BOOKMARKS_LIMIT } from "~/js/common/const";
import { 
  setPromptsBookmarkArray as setPromptsBookmarkArrayToStorage
} from '~/js/common/storage';
import { notificate } from "~/js/common/notificate";

const IMPORT_ADD_METHOD = "Add";
const IMPORT_OVERWRITE_METHOD = "Overwrite";

export function useEnhancer(props) {
  const { close, promptsBookmarkArray } = props;
  const importMethod = ref(IMPORT_ADD_METHOD);
  const importErrorMessage = ref("");
  
  const selectImportAddMethod = () => {
    importMethod.value = IMPORT_ADD_METHOD;
  }

  const selectImportOverwriteMethod = () => {
    importMethod.value = IMPORT_OVERWRITE_METHOD;
  }

  const clickImportBookmarksButton = () => {
    const inputFileElement = document.getElementById('inputImportBookmarks');
    // for select same file change event trigger
    inputFileElement.value = "";
    inputFileElement.click();
  }

  const importBookmarks = (event) => {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0], 'UTF-8');
    reader.onload = () => {
      try {
        importProcess(importMethod.value, new ImportObject(reader.result), promptsBookmarkArray)
        close();
      } catch (error) {
        importErrorMessage.value = (error);
        notificate("Import Error", error);
      }
    }
  }

  return {
    importMethod,
    selectImportAddMethod,
    selectImportOverwriteMethod,
    importErrorMessage,
    clickImportBookmarksButton,
    importBookmarks,
    IMPORT_ADD_METHOD,
    IMPORT_OVERWRITE_METHOD
  };
}

class ImportObject {
  constructor(importObjectStr) {
    let importObject = null;
    try {
      importObject = JSON.parse(importObjectStr)
    } catch {
      throw "JSON parse error.";
    }

    this.version = importObject.version;
    this.promptsBookmarks = importObject.promptsBookmarks;
    if (!this.valid()) throw "This file is not correct format.";
  }

  valid() {
    return true;
  }

  getPromptsBookmarks() {
    return this.promptsBookmarks.map(promptsBookmarks => {
      return {
        "title": promptsBookmarks.title,
        "prompts": promptsBookmarks.prompts,
        "visibleDetail": promptsBookmarks.visibleDetail
      }
    });
  }
}

function importProcess(importMethod, importObject, promptsBookmarkArray) {
  const importPromptsBookmarkArray = importObject.getPromptsBookmarks();

  let newPromptsBookmarkArray = null;
  switch (importMethod) {
    case IMPORT_ADD_METHOD:
      newPromptsBookmarkArray = [
        ...promptsBookmarkArray,
        ...importPromptsBookmarkArray
      ];
      break;
    case IMPORT_OVERWRITE_METHOD:
      newPromptsBookmarkArray = [...importPromptsBookmarkArray]
      break;
    default:
      throw "Please select import method.";
  }

  if (newPromptsBookmarkArray.length > PROMPTS_BOOKMARKS_LIMIT) {
    throw `Over bookmarks size(${newPromptsBookmarkArray.length}/${PROMPTS_BOOKMARKS_LIMIT}).`;
  }
  
  promptsBookmarkArray.splice(0);
  promptsBookmarkArray.push(...newPromptsBookmarkArray);
  setPromptsBookmarkArrayToStorage(promptsBookmarkArray);

  notificate("Imported PromptsBookmark", `${importMethod} ${importPromptsBookmarkArray.length} bookmarks.`);
}