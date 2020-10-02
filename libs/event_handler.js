import LinkHints from './link_hints.js';

class EventHandler {
  constructor() {
    this.linkHints = new LinkHints();
  }

  run() {
    this.addKeydown();
    this.addKeyup();
    this.addScroll();
  }

  addKeydown() {
    document.addEventListener('keydown', function(e) {
      switch (e.key) {
        case 'f':
          if (!this.linkHints.active) {
            this.linkHints.show();
          } else {
            this.linkHints.clear();
          }
          break;
      }
    }.bind(this));
  }

  addKeyup() {
    document.addEventListener('keyup', function(e) {
      if (this.linkHints.active && e.key !== 'f') {
        clearTimeout(this.linkHints.timer);
        this.linkHints.selectedLink += e.key;
        this.linkHints.timer = setTimeout(function() {
          const href = document.getElementsByClassName('vimfox-link-' + this.linkHints.selectedLink)[0].href;
          this.linkHints.clear();
          window.open(href, '_self');
        }.bind(this), 500);
      }
    }.bind(this));
  }

  addScroll() {
    window.addEventListener('scroll', function() {
      if (this.linkHints.active) {
        this.linkHints.clear();
      }
    }.bind(this));
  }
}

export default EventHandler;
