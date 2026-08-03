(() => {
  const buildAvatar = (userName, size) => {
    const icon = document.createElement('a');
    const img = document.createElement('img');

    icon.classList.add('avatar', 'avatar-user');

    img.classList.add('from-avatar', 'avatar-user');
    img.setAttribute('src', `https://github.com/${userName}.png`);
    img.setAttribute('width', size);
    img.setAttribute('height', size);
    img.setAttribute('alt', `@${userName}`);
    icon.appendChild(img);

    return icon;
  };

  // Classic (Rails-rendered) issues / pull requests list.
  const insertAvatarToClassicList = () => {
    [...document.querySelectorAll('.opened-by')].forEach((e) => {
      // Don't apply twice.
      if (e.parentElement.querySelector('.avatar-user')) {
        return;
      }

      if (e.querySelector('.Label--secondary')?.textContent === 'bot') {
        return;
      }

      const userName = e.querySelector('a').textContent;
      const icon = buildAvatar(userName, 20);
      icon.style.marginLeft = '4px';

      e.parentElement.appendChild(icon);
    });
  };

  // React-based issues list (react-app[app-name="issues-react"]).
  // Its class names are hashed per build, so rely on data-* attributes only.
  const insertAvatarToReactList = () => {
    const rows = document.querySelectorAll(
      '[data-testid="list-row-repo-name-and-number"] [data-testid="created-at"]'
    );
    [...rows].forEach((e) => {
      // Don't apply twice. The row may also contain assignee avatars,
      // so look for our own marker class only.
      if (e.querySelector('.from-avatar')) {
        return;
      }

      const authorLink = e.querySelector('a[data-hovercard-type="user"]');
      if (!authorLink) {
        return;
      }

      const userName = authorLink.textContent.trim();
      // GitHub Apps (bots) have no avatar at https://github.com/<name>.png.
      if (userName.endsWith('[bot]') || authorLink.getAttribute('href')?.includes('app%2F')) {
        return;
      }

      const icon = buildAvatar(userName, 16);
      icon.style.marginRight = '4px';
      icon.firstChild.style.verticalAlign = 'text-bottom';

      authorLink.before(icon);
    });
  };

  const insertAvatar = () => {
    insertAvatarToClassicList();
    insertAvatarToReactList();
  };

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
