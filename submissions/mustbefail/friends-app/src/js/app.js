import { API_REQ, sortUsers, filterUsers, resetFilters } from './services.js';
import makeCardTemplate from './template.js';

const contactsContainer = document.querySelector('.contacts-container');

const render = async (state) => {
  const response = await getUsers(API_REQ, 5);
  const json = await response.json();
  const users = await json.results;
  const sortedUsers = sortUsers(state.sort, users);
  const filteredUsers = filterUsers(state.filter, sortedUsers);
  const cards = filteredUsers
    .map((user) =>
      makeCardTemplate(
        user.name,
        user.email,
        user.location.city,
        user.dob.date,
        user.dob.age,
        user.phone,
        user.picture.large
      )
    )
    .join('');
  contactsContainer.innerHTML = cards;
};

const getUsers = async (url, n) => {
  try {
    return await fetch(url);
  } catch (err) {
    if (n === 1) throw err;
    return await getUsers(url, n - 1);
  }
};

export default () => {
  const state = {
    sort: null,
    filter: {
      name: null,
      gender: null,
    },
  };

  const sorters = document.querySelectorAll('.sort');
  sorters.forEach((sorter) =>
    sorter.addEventListener('change', ({ target }) => {
      state[target.name] = target.value;
      render(state);
    })
  );

  const filters = document.querySelectorAll('.filter');
  filters.forEach((filter) =>
    filter.addEventListener('input', ({ target }) => {
      state.filter[target.name] = target.value;
      render(state);
    })
  );

  const resetButton = document.querySelector('.reset-filters');
  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetFilters(state);
    render(state);
  });

  const menuTrigger = document.querySelector('.menu-trigger');
  const filterMenu = document.querySelector('.filter-sidebar');
  menuTrigger.addEventListener('click', () => {
    filterMenu.classList.toggle('visible');
  });

  render(state);
};
