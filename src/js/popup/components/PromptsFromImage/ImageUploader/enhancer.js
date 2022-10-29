
import { ref } from "vue";
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

    try {
      const pngParser = new PngParser(await readImage(files[0]));
      const imageSrc = pngParser.getDataURI();
      const metadata = pngParser.getMetadata();
      if(imageSrc) updateImageSrc(imageSrc);
      if(metadata["Comment"]) updateMetadataNai(JSON.parse(metadata["Comment"]));
      if(metadata["Description"]) {
        updatePrompts(metadata["Description"]);
      } else {
        notificate("Load Failed", "This image has no prompts");  
      }
      updateMetadataPng(metadata);
    } catch (e) {
      notificate("Load Failed", "The image is unsupported");
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

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}