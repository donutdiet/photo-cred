import "./main.css";
import { handleImageUpload, removeImage, downloadImage } from "./imageHandler";
import { updateCanvas } from "./canvasHandler";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const imageInput = document.querySelector(".file");
const canvas = document.querySelector(".image-canvas");

const text = document.querySelector("#text");
const fontSize = document.querySelector("#font-size");
const fontColor = document.querySelector("#font-color");
const backgroundColor = document.querySelector("#background-color");
const color_wrapper = document.querySelector("#color_wrapper");
const backgroundAlpha = document.querySelector("#background-alpha");

const removeButton = document.querySelector(".remove-button");
const clearButton = document.querySelector(".clear-button");
const downloadButton = document.querySelector(".download-button");

function set_color() {
  color_wrapper.style.backgroundColor =
    backgroundColor.value +
    (backgroundAlpha.value == 255
      ? ""
      : parseInt(backgroundAlpha.value).toString(16).padStart(2, "0"));
}

const getTextInputValues = () => ({
  text: text.value,
  fontSize: fontSize.value,
  fontColor: fontColor.value,
  backgroundColor: backgroundColor.value,
  backgroundAlpha: backgroundAlpha.value,
});

const resetTextInputValues = () => {
  text.value = "";
  fontSize.value = "";
  fontColor.value = "#000000";
  backgroundColor.value = "#FFFFFF";
  backgroundAlpha.value = "127";
};

const updateCanvasWithInputs = () => {
  const uploadedImage = getUploadedImage();
  if (uploadedImage) {
    const { text, fontSize, fontColor, backgroundColor, backgroundAlpha } =
      getTextInputValues();
    updateCanvas(
      canvas,
      uploadedImage,
      text,
      fontSize,
      fontColor,
      backgroundColor,
      backgroundAlpha,
    );
  }
};

const getUploadedImage = handleImageUpload(
  imageInput,
  canvas,
  getTextInputValues,
);

text.addEventListener("input", updateCanvasWithInputs);
fontSize.addEventListener("input", updateCanvasWithInputs);
fontColor.addEventListener("change", updateCanvasWithInputs);
backgroundColor.addEventListener("input", set_color);
backgroundAlpha.addEventListener("input", set_color);
backgroundColor.addEventListener("change", () => {
  set_color();
  updateCanvasWithInputs();
});
backgroundAlpha.addEventListener("change", () => {
  set_color();
  updateCanvasWithInputs();
});

removeButton.addEventListener("click", () => {
  removeImage(canvas, getTextInputValues);
});
clearButton.addEventListener("click", () => {
  removeImage(canvas, getTextInputValues);
  resetTextInputValues();
});
downloadButton.addEventListener("click", () => {
  downloadImage(canvas);
});

set_color();
