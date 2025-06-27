document.addEventListener('DOMContentLoaded', () => {
  const videoBtn = document.getElementById('load-video-btn');
  const canvasArea = document.querySelector('.slide-canvas');

  function extractYouTubeID(url) {
    // Basic regex to extract video ID from many YouTube URL formats
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  videoBtn.addEventListener('click', () => {
    const input = document.getElementById('video-url').value.trim();
    const videoId = extractYouTubeID(input);

    if (!videoId) {
      alert('Please enter a valid YouTube video URL.');
      return;
    }

    // Avoid adding multiple times
    if (document.getElementById('yt-wrapper')) return;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'yt-wrapper';
    wrapper.style.width = '560px';
    wrapper.style.height = '315px';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '100px';
    wrapper.style.left = '100px';
    wrapper.style.zIndex = 1000;
    wrapper.style.background = '#fff';
    wrapper.classList.add('draggable'); // for selection & styling

    // Create inner border container for clickable border and selection
    const borderContainer = document.createElement('div');
    borderContainer.style.position = 'relative';
    borderContainer.style.width = '100%';
    borderContainer.style.height = '100%';
    borderContainer.style.padding = '10px';  // border thickness
    borderContainer.style.boxSizing = 'border-box';
    borderContainer.style.border = '3px solid transparent'; // default no visible border
    borderContainer.style.cursor = 'pointer';

    // Click to select this wrapper
    borderContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      // Deselect other selected
      document.querySelectorAll('.draggable.selected').forEach(el => el.classList.remove('selected'));
      wrapper.classList.add('selected');
    });

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'yt-player';
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    // Assemble elements
    borderContainer.appendChild(iframe);
    wrapper.appendChild(borderContainer);
    canvasArea.appendChild(wrapper);

    // Initialize interact.js on wrapper
    interact('#yt-wrapper')
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent', // restrict to .slide-canvas
            endOnly: true
          })
        ],
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.style.left) || 0) + event.dx;
            const y = (parseFloat(target.style.top) || 0) + event.dy;

            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
          }
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            const target = event.target;
            let { width, height } = event.rect;

            target.style.width = width + 'px';
            target.style.height = height + 'px';

            // Update position
            const x = (parseFloat(target.style.left) || 0) + event.deltaRect.left;
            const y = (parseFloat(target.style.top) || 0) + event.deltaRect.top;

            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 200, height: 150 }
          }),
          interact.modifiers.restrictEdges({
            outer: 'parent',
            endOnly: true
          })
        ]
      });
  });

  // Deselect all when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.draggable.selected').forEach(el => el.classList.remove('selected'));
  });

  // Delete selected wrapper on Delete or Backspace key
  document.addEventListener('keydown', function (e) {
    const activeElement = document.querySelector('.draggable.selected');
    if (activeElement && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault(); // Prevent page navigation (Backspace)
      activeElement.remove();
    }

    interact.modifiers.restrictRect({
  restriction: 'parent',
  endOnly: true
})

document.addEventListener('paste', function (e) {
        if (!e.clipboardData) return;

        const items = e.clipboardData.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                if (blob) {
                    const url = URL.createObjectURL(blob);

                    fabric.Image.fromURL(url, function (img) {
                        img.set({
                            left: 100,
                            top: 100,
                            scaleX: 0.5,
                            scaleY: 0.5
                        });
                        canvas.add(img);
                        canvas.requestRenderAll();
                        URL.revokeObjectURL(url); // clean up
                    });
                }
            }
        }
    });

  });
});
