document.addEventListener('DOMContentLoaded', () => {
  const videoBtn = document.getElementById('tool-video');
  const canvasArea = document.querySelector('.slide-canvas');

  videoBtn.addEventListener('click', () => {
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
    wrapper.style.border = '2px solid #000';
    wrapper.style.zIndex = 1000;
    wrapper.style.background = '#fff';

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'yt-player';
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    wrapper.appendChild(iframe);
    canvasArea.appendChild(wrapper);

    // Apply interact.js
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
    });