const insertAvatar = () => {
  [...document.querySelectorAll('.opened-by')].forEach((e) => {
    // Don't apply twice.
    if (e.parentElement.querySelector('.avatar-user')) {
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

const observer = new MutationObserver((_, o) => {
  // Re-observe child content. It may be removed on parent content changed.
  o.observe(document.querySelector('#repo-content-pjax-container'), { childList: true });
  insertAvatar();
});

// On page change
observer.observe(document.querySelector('#js-repo-pjax-container'), { childList: true });
// On search query change
observer.observe(document.querySelector('#repo-content-pjax-container'), { childList: true });
