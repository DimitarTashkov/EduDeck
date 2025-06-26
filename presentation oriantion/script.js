document.addEventListener("DOMContentLoaded", function () {
    // Create canvas once
    var canvas = new fabric.Canvas('slide-canvas', {
        selection: false
    });

    // Add default rectangle (optional)
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 200,
        height: 100,
        angle: 0
    });

    // Shape creation with type + color
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

        if (shape) {
            canvas.add(shape);
        }
    });

    // Text Button Click
    document.getElementById("tool-text").addEventListener("click", function () {
        var text = new fabric.IText('Edit me', {
            left: 200,
            top: 200,
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'black'
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
    });

    // Delete key functionality
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

    // Image upload button
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
