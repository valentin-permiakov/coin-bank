const navBarSwitch = (btnArr, target) => {
  btnArr.forEach((item) => {
    item.classList.remove('nav-item__link--active');
  });

  target.classList.add('nav-item__link--active');
};

export { navBarSwitch as default };
