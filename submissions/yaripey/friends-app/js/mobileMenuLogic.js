let opened = false;

const sideMenu = document.querySelector('.sidebar')

const handleMenu = () => {
  if (opened) {
    sideMenu.classList.remove('opened')
    opened = false;
  } else {
    sideMenu.classList.add('opened')
    opened = true;
  }
}

export default handleMenu;
