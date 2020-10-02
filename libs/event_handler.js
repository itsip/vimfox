import LinkHints from './link_hints.js';

class EventHandler {
  constructor() {
    this.linkHints = new LinkHints();
  }

  start() {
    this.addKeydown();
    this.addKeyup();
    this.addScroll();
  }

  addKeydown() {
    document.addEventListener('keydown', function(e) {
      switch (e) {
        case 'f':
          if (!linkHints.active) {
            linkHints.show();
          } else {
            linkHints.clear();
          }
          break;
      }
    });
  }

  addKeyup() {
    document.addEventListener('keyup', function(e) {
      if (linkHints.active && e.key !== 'f') {
        clearTimeout(linksHints.timer);
        console.log(e.key);
        linkHints.selectedLink += e.key;
        linkHints.timer = setTimeout(function() {
          const href = document.getElementsByClassName('vimfox-link-' + selectedLink)[0].href;
          linkHints.clear();
          window.open(href, '_self');
        }, 500);
      }
    });
  }

  addScroll() {
    window.addEventListener('scroll', function() {
      clearLinks();
    });
  }
}

export default EventHandler;
