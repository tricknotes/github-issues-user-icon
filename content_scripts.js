[...document.querySelectorAll('.opened-by')].forEach((e) => {
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
