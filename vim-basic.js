let timer;
let linksActive = false;
let selectedLink = '';
let scroll = 0;

function isBottom() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function isVisible(el) {
  const computedStyle = window.getComputedStyle(el, null);
  return computedStyle.getPropertyValue('visibility') === 'visible'
    && !(el.offsetParent === null);
}

function showLinks() {
  const parent = document.createElement('div');
  parent.className += ' vim-basic-links';

  for (let i = 0; i < document.links.length; i++) {
    const link = document.links[i];
    if (isVisible(link)) {
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

      link.className += ' vim-basic-link vim-basic-link-' + i;
      parent.appendChild(node);
    }
  }

  document.documentElement.appendChild(parent);
  linksActive = true;
}

function clearLinks() {
  selectedLink = '';

  const parent = document.getElementsByClassName('vim-basic-links')[0]
  parent.remove();

  const links = document.getElementsByClassName('vim-basic-link')

  for (let i = 0; i < links.length; i++) {
    links[i].className = links[i].className.replace(/vim-basic-link-\d+/g, '');
  }

  while (links.length) {
    links[0].classList.remove('vim-basic-link');
  }

  linksActive = false;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'f') {
    if (!linksActive) {
      showLinks();
    } else {
      clearLinks();
    }
  } else if (e.key === 'j' && !isBottom()) {
    scroll += 50;
    window.scrollTo({
      top: scroll,
      left: 0,
      behavior: 'smooth'
    });
  } else if (e.key === 'k' && scroll !== 0) {
    scroll -= 50;
    window.scrollTo({
      top: scroll,
      left: 0,
      behavior: 'smooth'
    });
  }
});

document.addEventListener('keyup', function(e) {
  if (linksActive && e.key !== 'f') {
    clearTimeout(timer);
    console.log(e.key);
    selectedLink += e.key;
    timer = setTimeout(function() {
      const href = document.getElementsByClassName('vim-basic-link-' + selectedLink)[0].href;
      clearLinks();
      window.open(href, '_self');
    }, 500);
  }
});

window.addEventListener('scroll', function() {
  clearLinks();
});
