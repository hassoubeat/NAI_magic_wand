
import { ref, reactive } from "vue";
 
export function useEnhancer() {
  const imageSrc = ref("");
  const prompts = ref("");
  const negativePrompts = ref("");
  const metadataNai = reactive({});
  const metadataPng = reactive({});

  const updateImageSrc = (value) => {
    imageSrc.value = value;
  }

  const updatePrompts = (value) => {
    prompts.value = value;
  }

  const updateNegativePrompts = (value) => {
    negativePrompts.value = value;
  }

  const updateMetadataNai = (newMetadataNai) => {
    Object.keys(metadataNai).forEach(key => delete metadataNai[key])
    Object.assign(metadataNai, { ...newMetadataNai })
  }

  const updateMetadataPng = (newMetadataPng) => {
    Object.keys(metadataPng).forEach(key => delete metadataPng[key])
    Object.assign(metadataPng, { ...newMetadataPng })
  }

  return {
    imageSrc,
    prompts,
    negativePrompts,
    metadataNai,
    metadataPng,
    updateImageSrc,
    updatePrompts,
    updateNegativePrompts,
    updateMetadataNai,
    updateMetadataPng
  }
}



