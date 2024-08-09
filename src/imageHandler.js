import { updateCanvas } from './canvasHandler';

function handleImageUpload(imageInput, canvas, getTextInputValues) {
  let uploadedImage;

  imageInput.addEventListener('change', (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);

    uploadedImage = new Image();
    uploadedImage.src = imageDataUrl;

    uploadedImage.addEventListener('load', () => {
      canvas.style.display = 'block';
      document.querySelector('.image-upload-prompt').textContent = '';
      const { text, fontSize, fontColor, backgroundColor, backgroundAlpha } = getTextInputValues();
      updateCanvas(canvas, uploadedImage, text, fontSize, fontColor, backgroundColor, backgroundAlpha);
    }, { once: true });
  });

  return () => uploadedImage;
}

function removeImage(canvas, getTextInputValues) {
  const uploadedImage = new Image();
  const { text, fontSize, fontColor, backgroundColor, backgroundAlpha } = getTextInputValues();
  updateCanvas(canvas, uploadedImage, text, fontSize, fontColor, backgroundColor, backgroundAlpha);
  canvas.style.display = 'none';
  document.querySelector('.image-upload-prompt').textContent = 'Drag & drop images here or browse';
}

function downloadImage(canvas) {
  const downloadLink = document.querySelector('.canvas-download-link');
  const pngDataUrl = canvas.toDataURL('image/png');
  downloadLink.href = pngDataUrl;
}

export { handleImageUpload, removeImage, downloadImage }