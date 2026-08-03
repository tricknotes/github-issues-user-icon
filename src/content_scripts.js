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

  // GitHub replaces deeply nested containers (or the `body` itself) on navigation,
  // so observing a specific container stops working once it is swapped out.
  // Observe the document root with `subtree` instead, debouncing the callback
  // since a single navigation causes many mutation records.
  let timer = null;
  const observer = new MutationObserver(() => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      insertAvatar();
    }, 100);
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
