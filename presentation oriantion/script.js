document.addEventListener("DOMContentLoaded", function () {
    var canvas = new fabric.Canvas('slide-canvas', {
        selection: false
    });

    // Add a default rectangle
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 200,
        height: 100,
        angle: 0
    });

    canvas.add(rect);

    // Shape Button Click
    document.getElementById("tool-shape").addEventListener("click", function () {
        var newRect = new fabric.Rect({
            left: 150,
            top: 150,
            fill: 'green',
            width: 100,
            height: 50,
            angle: 0
        });
        canvas.add(newRect);
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

    // Image Button Click (placeholder logic, actual image loading requires input)
    document.getElementById("tool-image").addEventListener("click", function () {
        fabric.Image.fromURL('https://via.placeholder.com/150', function(img) {
            img.set({
                left: 250,
                top: 250,
                scaleX: 0.5,
                scaleY: 0.5
            });
            canvas.add(img);
        });
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
});