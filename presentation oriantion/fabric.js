document.addEventListener("DOMContentLoaded", function () {
    var canvas = new fabric.Canvas('slide-canvas', {
        selection: false
    });

    // Add shape
    const shapeSelect = document.getElementById('shape-select');
    const shapeColor = document.getElementById('shape-color');
    const addShapeBtn = document.getElementById('tool-add-shape');

    addShapeBtn.addEventListener("click", function () {
        const type = shapeSelect.value;
        const color = shapeColor.value;
        let shape;

        switch (type) {
            case 'rect':
                shape = new fabric.Rect({
                    left: 150,
                    top: 150,
                    fill: color,
                    width: 100,
                    height: 50
                });
                break;
            case 'circle':
                shape = new fabric.Circle({
                    left: 150,
                    top: 150,
                    fill: color,
                    radius: 50
                });
                break;
            case 'triangle':
                shape = new fabric.Triangle({
                    left: 150,
                    top: 150,
                    fill: color,
                    width: 100,
                    height: 100
                });
                break;
        }

        if (shape) canvas.add(shape);
    });

    // Add text with font and size
    const textBtn = document.getElementById("tool-text");
    const fontFamilySelect = document.getElementById("font-family");
    const fontSizeInput = document.getElementById("font-size");

    textBtn.addEventListener("click", function () {
        const fontFamily = fontFamilySelect.value;
        const fontSize = parseInt(fontSizeInput.value) || 24;

        const text = new fabric.IText('Edit me', {
            left: 200,
            top: 200,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: 'black'
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
    });

    // Delete object
    document.addEventListener('keydown', function(e) {
        if ((e.key === "Delete" || e.key === "Backspace") &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {
            var activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.requestRenderAll();
            }
        }
    });

    // Image upload
    const fileInput = document.getElementById('upload-image');
    const imageBtn = document.getElementById('tool-image');

    imageBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (f) {
            const data = f.target.result;

            fabric.Image.fromURL(data, function (img) {
                img.set({
                    left: 100,
                    top: 100,
                    scaleX: 0.5,
                    scaleY: 0.5
                });
                canvas.add(img);
                canvas.requestRenderAll();
            });
        };
        reader.readAsDataURL(file);
        fileInput.value = "";
    });
});
