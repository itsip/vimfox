class LinkHints {
  constructor() {
    this.active = false;
    this.selectedLink = '';
    this.timer;
  }

  show() {
    const parent = document.createElement('div');
    parent.className += ' vimfox-links';

    for (let i = 0; i < document.links.length; i++) {
      const link = document.links[i];
      if (this.isVisible(link)) {
        const node = document.createElement('div');
        const content = document.createTextNode(i);
        node.appendChild(content);

        node.rect = link.getBoundingClientRect();
        node.style.left = node.rect.left + 'px';
        node.style.top = node.rect.top  + 'px';
        node.style.color = 'white';
        node.style.backgroundColor = 'red';
        node.style.padding = '2px 6px';
        node.style.borderRadius = '2px';
        node.style.fontWeight = 'bold';
        node.style.fontSize = '13px';
        node.style.fontFamily = 'Arial, Helvetica, sans-serif';
        node.style.opacity = '0.7';
        node.style.position = 'fixed';
        node.style.zIndex = '999999999999';

        link.className += ' vimfox-link vimfox-link-' + i;
        parent.appendChild(node);
      }
    }

    document.documentElement.appendChild(parent);
    this.active = true;
  }

  clear() {
    this.selectedLink = '';

    const parent = document.getElementsByClassName('vimfox-links')[0]
    parent.remove();

    const links = document.getElementsByClassName('vimfox-link')

    for (let i = 0; i < links.length; i++) {
      links[i].className = links[i].className.replace(/vimfox-link-\d+/g, '');
    }

    while (links.length) {
      links[0].classList.remove('vimfox-link');
    }

    this.active = false;
  }

  isVisible() {
    const computedStyle = window.getComputedStyle(el, null);
    return computedStyle.getPropertyValue('visibility') === 'visible'
      && !(el.offsetParent === null);
  }
}

export default LinkHints;
