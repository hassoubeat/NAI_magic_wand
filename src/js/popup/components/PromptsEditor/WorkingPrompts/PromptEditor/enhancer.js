import { computed } from "vue";
import { generatePromptsWithWeight } from '~/js/common/prompt';

export function useEnhancer(props) {
  const { index, workPrompt, updateWorkPrompt } = props;

  const isEditing = computed(() => {
    return workPrompt.originalPrompt !== generatePromptsWithWeight(workPrompt.prompt, workPrompt.weight);
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

  const incrementWeight = () => {
    if (workPrompt.weight >= 10) return;
    workPrompt.weight++;
    updateWorkPrompt(index, workPrompt);
  }

  const decrementWeight = () => {
    if (workPrompt.weight <= -10) return;
    workPrompt.weight--;
    updateWorkPrompt(index, workPrompt);
  }

  return {
    isEditing,
    isNew,
    toggleUse,
    updatePrompt,
    incrementWeight,
    decrementWeight
  };
}