function updateCanvas(canvas, image, text, fontSize, fontColor, backgroundColor, backgroundAlpha) {
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    const background = `${backgroundColor}${parseInt(backgroundAlpha).toString(16).padStart(2, "0")}`;
    ctx.font = `${Number(fontSize)}px sans-serif`;
    ctx.textAlign = 'center';

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = Number(fontSize);

    ctx.fillStyle = background 
    ctx.fillRect(
        (width - textWidth) / 2 - 10,
        height - textHeight,
        textWidth + 20,
        textHeight
    );
    ctx.fillStyle = fontColor;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, width / 2, height);
}

export { updateCanvas }