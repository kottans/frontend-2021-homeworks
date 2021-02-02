import { API_REQ, sortUsers, filterUsers, resetFilters } from './services.js';
import makeCardTemplate from './template.js';

const contactsContainer = document.querySelector('.contacts-container');

const render = (state) => {
  const { sort, filter, users } = state;
  const sortedUsers = sortUsers(sort, users);
  const filteredUsers = filterUsers(filter, sortedUsers);
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

const getUsers = async (url, state) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      const users = await json.results;
      state.users = [...users];
      render(state);
    }
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  const state = {
    sort: null,
    filter: {
      name: null,
      gender: null,
    },
    users: [],
  };

  const sorters = document.querySelectorAll('.sort');
  sorters.forEach((sorter) =>
    sorter.addEventListener('change', ({ target }) => {
      const { name, value } = target;
      state[name] = value;
      render(state);
    })
  );

  const filters = document.querySelectorAll('.filter');
  filters.forEach((filter) =>
    filter.addEventListener('input', ({ target }) => {
      const { name, value } = target;
      state.filter[name] = value.toLowerCase();
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

  getUsers(API_REQ, state);
};
