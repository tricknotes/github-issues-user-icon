(() => {
  const insertAvatar = () => {
    [...document.querySelectorAll('.opened-by')].forEach((e) => {
      // Don't apply twice.
      if (e.parentElement.querySelector('.avatar-user')) {
        return;
      }

      if (e.querySelector('.Label--secondary')?.textContent === 'bot') {
        return;
      }

      const userName = e.querySelector('a').textContent;
      const icon = document.createElement('a');
      const img = document.createElement('img');

      icon.classList.add('avatar', 'avatar-user');
      icon.style.marginLeft = '4px';

      img.classList.add('from-avatar', 'avatar-user');
      img.setAttribute('src', `https://github.com/${userName}.png`);
      img.setAttribute('width', 20);
      img.setAttribute('height', 20);
      img.setAttribute('alt', `@${userName}`);
      icon.appendChild(img);

      e.parentElement.appendChild(icon);
    });
  }

  insertAvatar();

  const $ = (...args) => document.querySelector(...args);

  const observer = new MutationObserver((_, o) => {
    // Re-observe child content. It may be removed on parent content changed.
    const element = $('#repo-content-pjax-container');
    if (element) {
      o.observe(element, { childList: true });
    }
    insertAvatar();
  });

  const parentContainer = $('#js-repo-pjax-container');
  const childContainer = $('#repo-content-pjax-container');
  // On page change
  if (parentContainer) {
    observer.observe(parentContainer, { childList: true });
  }
  // On search query change
  if (childContainer) {
    observer.observe(childContainer, { childList: true });
  }
})();
