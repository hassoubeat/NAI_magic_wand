
import { ref, reactive } from "vue";
 
export function useEnhancer() {
  const imageSrc = ref("");
  const prompts = ref("");
  const metadataNai = reactive({});
  const metadataPng = reactive({});

  const updateImageSrc = (value) => {
    imageSrc.value = value;
  }

  const updatePrompts = (value) => {
    prompts.value = value;
  }

  const updateMetadataNai = (newMetadataNai) => {
    Object.assign(metadataNai, { ...newMetadataNai })
  }

  const updateMetadataPng = (newMetadataPng) => {
    Object.assign(metadataPng, { ...newMetadataPng })
  }

  return {
    imageSrc,
    prompts,
    metadataNai,
    metadataPng,
    updateImageSrc,
    updatePrompts,
    updateMetadataNai,
    updateMetadataPng
  }
}



