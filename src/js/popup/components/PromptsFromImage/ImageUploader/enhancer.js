
import { ref } from "vue";
import { NOVEL_AI_GENERATE_IMAGE_IDENTIER } from '~/js/common/const';
import { notificate } from '~/js/common/notificate';
import { PngParser } from '~/js/common/pngParser';
 
export function useEnhancer(props) {
  const {
    updateImageSrc,
    updatePrompts,
    updateMetadataNai,
    updateMetadataPng,
  } = props;

  const isDragging = ref(false);

  const loadImage = async (files) => {
    if (!validateUploadImage(files)) {
      notificate("Load Failed", 'Only one ".png" file');
      return;
    }

    // intialize
    updateImageSrc("");
    updatePrompts("");
    updateMetadataNai({});
    updateMetadataPng({});

    try {
      const pngParser = new PngParser(await readImage(files[0]));
      const imageSrc = pngParser.getDataURI();
      if(imageSrc) updateImageSrc(imageSrc);

      const metadata = pngParser.getMetadata();
      if (validateImageMadeByNovelAI(metadata)) {
        updatePrompts(metadata["Description"]);
        updateMetadataNai(JSON.parse(metadata["Comment"]));
      } else {
        notificate("Load Failed", "This image was not created by NovelAI");  
      }
      updateMetadataPng(metadata);
    } catch (e) {
      notificate("Load Failed", "This image is unsupported");
      console.error(e);
    }
  }

  const dragOverImage = () => {
    isDragging.value = true;
  }

  const dragLeaveImage = () => {
    isDragging.value = false;
  }

  const dropImage = (event) => {
    isDragging.value = false
    const files = event.dataTransfer.files;
    loadImage(files);
  }

  const selectImage = (event) => {
    const files = event.target.files;
    loadImage(files);
  }

  return {
    isDragging,
    dragOverImage,
    dragLeaveImage,
    dropImage,
    selectImage
  }
}

function validateUploadImage(files) {
  return (files.length !== 1 || files[0].type === 'image/png');
}

function validateImageMadeByNovelAI(metadata) {
  if (metadata["Software"] !== NOVEL_AI_GENERATE_IMAGE_IDENTIER) return false;
  if (!metadata["Description"]) return false;
  if (!metadata["Comment"]) return false;

  return true;
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}