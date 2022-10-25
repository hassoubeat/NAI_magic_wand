import { copy } from "~/js/common/clipboard";
import { notificate } from "~/js/common/notificate";

export function useEnhancer(props) {
  const { originalIndex, promptsBookmark, updatePromptsBookmark } = props;

  const toggleAccordion = () => {
    promptsBookmark.visibleDetail = !promptsBookmark.visibleDetail;
    updatePromptsBookmark(originalIndex, promptsBookmark);
  }

  const copyPrompts = async () => {
    await copy(promptsBookmark.prompts);
    notificate("Copied Prompts", `from "${promptsBookmark.title}" bookmark.`);
  }

  const updateTitle = (event) => {
    promptsBookmark.title = event.target.value;
    updatePromptsBookmark(originalIndex, promptsBookmark);
  }

  const updatePrompts = (event) => {
    promptsBookmark.prompts = event.target.value;
    updatePromptsBookmark(originalIndex, promptsBookmark);
  }

  return {
    toggleAccordion,
    copyPrompts,
    updateTitle,
    updatePrompts
  };
}