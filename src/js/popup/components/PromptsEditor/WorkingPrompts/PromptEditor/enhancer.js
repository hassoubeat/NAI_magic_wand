import { computed } from "vue";
import { generatePromptsWithCurlyBracket } from '~/js/common/prompt';

export function useEnhancer(props) {
  const { index, workPrompt, updateWorkPrompt } = props;

  const isEditing = computed(() => {
    return workPrompt.originalPrompt !== generatePromptsWithCurlyBracket(workPrompt.prompt, workPrompt.countCurlyBracket);
  });

  const isNew = computed(() => {
    return workPrompt.originalPrompt === "";
  });

  const toggleUse = () => {
    workPrompt.isUse = !workPrompt.isUse;
    updateWorkPrompt(index, workPrompt);
  }

  const updatePrompt = (event) => {
    workPrompt.prompt = event.target.value;
    updateWorkPrompt(index, workPrompt);
  }

  const incrementCurlyBracket = () => {
    if (workPrompt.countCurlyBracket >= 10) return;
    workPrompt.countCurlyBracket++;
    updateWorkPrompt(index, workPrompt);
  }

  const decrementCurlyBracket = () => {
    if (workPrompt.countCurlyBracket <= 0) return;
    workPrompt.countCurlyBracket--;
    updateWorkPrompt(index, workPrompt);
  }

  return {
    isEditing,
    isNew,
    toggleUse,
    updatePrompt,
    incrementCurlyBracket,
    decrementCurlyBracket
  };
}