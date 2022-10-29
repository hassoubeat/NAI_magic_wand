
import { ref } from "vue";
import { notificate } from '~/js/common/notificate';
import { PngParser } from '~/js/common/pngParser';
 
export function useEnhancer() {
  const isDragging = ref(false);

  const loadImage = async (files) => {
    if (!validateUploadImage(files)) {
      notificate("Load Failed", 'Only one ".png" file');
      return;
    }
    const pngParser = new PngParser(await readImage(files[0]));
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