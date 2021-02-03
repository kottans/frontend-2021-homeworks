const sortByAge = (a, b) => a.age - b.age;

const sortByName = (a, b) => a.name.localeCompare(b.name);

const sortByReg = (a, b) => a.registered - b.registered;

const filters = {
  gender: (value) => ({ gender }) => {
    if (value === 'both') return true;
    return gender === value;
  },
  name: (value) => ({ name }) => {
    if (value === '') return true;
    return name.toLowerCase().includes(value);
  },
};

export const sortUsers = (query, users) => {
  switch (query) {
    case 'age_asc':
      users.sort(sortByAge);
      break;
    case 'age_desc':
      users.sort((a, b) => sortByAge(b, a));
      break;
    case 'name_asc':
      users.sort(sortByName);
      break;
    case 'name_desc':
      users.sort((a, b) => sortByName(b, a));
      break;
    case 'registered_asc':
      users.sort(sortByReg);
      break;
    case 'registered_desc':
      users.sort((a, b) => sortByReg(b, a));
      break;
  }
};

export const filterUsers = (query, users) => {
  const fields = Object.keys(query);
  const activeFields = fields.filter((field) => query[field]);
  const result = activeFields.reduce((acc, field) => {
    const filterName = field;
    const match = filters[filterName];
    return acc.filter((user) => match(query[field])(user));
  }, users);

  return result;
};

export const resetState = (state) => {
  state.filtration = {
    filter: {},
    sort: null,
  };
};
