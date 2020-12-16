const advices = [
  {
    id: 1,
    title: `Designate a study area`,
    content: `The best study spot is one that is quiet, well-lit, and in a low-traffic area. Make sure there is a clear workspace to study and write on. Everyone’s needs are different, so it is important you find a spot that works for you.`,
    source: `<a href="https://www.oxfordlearning.com/how-to-study-effectively/" target="_blank">Source</a>`,
  },
  {
    id: 2,
    title: `Talk to teachers`,
    content: `Teachers are there to help you do your best. Talk to your teacher and ask for clarification or extra help if you need it before your test. Taking the initiative to ask for help goes a long way with teachers!`,
    source: `<a href="https://www.oxfordlearning.com/how-to-study-effectively/" target="_blank">Source</a>`,
  },
  {
    id: 3,
    title: `Study with a group`,
    content: `Working with classmates encourages an interactive environment to keep you engaged. This gives you a chance to test your knowledge with others, quiz each other on the content, and help boost each other’s confidence.`,
    source: `<a href="https://www.oxfordlearning.com/how-to-study-effectively/" target="_blank">Source</a>`,
  },
  {
    id: 4,
    title: `Ask questions if you don't understands`,
    content: `Raise your hand and ask questions if you don’t understand something. If you don’t feel comfortable asking in front of everyone, write yourself a reminder to talk to the teacher after class.`,
    source: `<a href="https://www.oxfordlearning.com/how-to-study-effectively/" target="_blank">Source</a>`,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navBar = document.getElementById('navBar');

  const hasNavBarClass = function () {
    if (navBar.classList.contains('open')) {
      navBar.classList.remove('open');
      let navBarLength = navBar.classList.length;
      if (navBarLength === 0) {
        navBar.removeAttribute('class');
      }
    } else {
      navBar.classList.add('open');
    }
  };

  const hamburgerIcon = function () {
    hamburgerBtn.textContent = hamburgerBtn.textContent === '☰' ? '☓' : '☰';
  };

  hamburgerBtn.addEventListener('click', () => {
    hasNavBarClass();
    hamburgerIcon();
  });

  const navList = document.getElementById('navList');

  function createMenuItems(advices) {
    const menuItems = advices.map(
      ({ id, title }) =>
        `<li data-target="#a${id}" class="nav-item">${title}</li>`
    );
    return menuItems.join('');
  }

  navList.innerHTML = createMenuItems(advices);

  const main = document.getElementById('main');
  const newDiv = document.createElement('div');
  newDiv.id = 'mainContainer';
  newDiv.className = 'container';
  main.appendChild(newDiv);
  const mainDiv = document.getElementById('mainContainer');

  function createContentItems(advices) {
    const contentItems = advices.map(
      ({ id, title, content, source }) =>
        `<div class="panel" id="a${id}">
        <h1>${title}</h1>
        <p>${content}</p>
        ${source}
        </div>`
    );
    return contentItems.join('');
  }

  mainDiv.innerHTML = createContentItems(advices);

  const ul = document.querySelector('.nav-list');
  const panels = document.querySelectorAll('.panel');
  panels[0].classList.add('active');

  ul.addEventListener('click', function (e) {
    if (e.target.tagName == 'LI') {
      const targetPanel = document.querySelector(e.target.dataset.target);
      Array.from(panels).forEach((panel) => {
        if (panel == targetPanel) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    }
  });

  let links = document.querySelectorAll('.nav-item');
  links[0].classList.add('active-item');

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      let current = document.querySelectorAll('.active-item');
      current[0].className = current[0].className.replace(' active-item', '');
      this.className += ' active-item';
      hasNavBarClass();
      hamburgerIcon();
    });
  }
});
