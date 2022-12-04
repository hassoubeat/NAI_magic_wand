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
        new ImportObject(importMethod.value, reader.result, promptsBookmarkArray).import();
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
  constructor(importMethod, importObjectStr, promptsBookmarkArray) {
    this.importMethod = importMethod;
    this.promptsBookmarkArray = promptsBookmarkArray;

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

  import() {
    const importPromptsBookmarkArray = this.getPromptsBookmarks();
  
    let newPromptsBookmarkArray = null;
    switch (this.importMethod) {
      case IMPORT_ADD_METHOD:
        newPromptsBookmarkArray = [
          ...this.promptsBookmarkArray,
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
    
    this.promptsBookmarkArray.splice(0);
    this.promptsBookmarkArray.push(...newPromptsBookmarkArray);
    setPromptsBookmarkArrayToStorage(this.promptsBookmarkArray);
  
    notificate("Imported PromptsBookmark", `${this.importMethod} ${importPromptsBookmarkArray.length} bookmarks.`);
  }
}