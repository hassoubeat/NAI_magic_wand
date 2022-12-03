import { 
  PROMPTS_BOOKMARKS_EXPORT_FILE_IDENTIFIER,
  PROMPTS_BOOKMARKS_EXPORT_FILE_LATEST_VERSION
} from "~/js/common/const";
import { toRaw } from 'vue';
 
export function useEnhancer(props) {
  const { promptsBookmarkArray } = props;

  const exportBookmarks = () => {
    const exportBookmarksJSON = generateExportBookmarksJSON(toRaw(promptsBookmarkArray))
    const exportBookmarksStr = JSON.stringify(exportBookmarksJSON, null, 2);
    const blob = new Blob([exportBookmarksStr], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "export.json";
    downloadLink.click();
    downloadLink.remove();
  }

  return { exportBookmarks }
}

function generateExportBookmarksJSON (promptsBookmarkArray) {
  return {
    "identifier": PROMPTS_BOOKMARKS_EXPORT_FILE_IDENTIFIER,
    "version": PROMPTS_BOOKMARKS_EXPORT_FILE_LATEST_VERSION,
    "promptsBookmarks": promptsBookmarkArray
  }
}