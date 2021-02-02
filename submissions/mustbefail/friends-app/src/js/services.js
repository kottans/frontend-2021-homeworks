export const API_REQ = `https://randomuser.me/api/?results=30&seed=a123bc&nat=us,dk,fr,gb&inc=gender,name,registered,dob,location,picture,phone,email`;

const fullName = (user) => `${user.name.first} ${user.name.last}`.toLowerCase();
const convertDate = (date) => new Date(date);

const sorters = {
  abc: (a, b) => fullName(a).localeCompare(fullName(b)),
  zyx: (a, b) => fullName(b).localeCompare(fullName(a)),
  ageMinMax: (a, b) => a.dob.age - b.dob.age,
  ageMaxMin: (a, b) => b.dob.age - a.dob.age,
  regMinMax: (a, b) =>
    convertDate(a.registered.date) - convertDate(b.registered.date),
  regMaxMin: (a, b) =>
    convertDate(b.registered.date) - convertDate(a.registered.date),
};

const filters = {
  gender: (value) => (user) => {
    if (value === 'both') return true;
    return user.gender === value;
  },
  name: (value) => (user) => {
    if (value === '') return true;
    return fullName(user).includes(value);
  },
};

export const sortUsers = (query, users) => {
  if (!query) return users;
  const sortedUsers = [...users].sort(sorters[query]);
  return sortedUsers;
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

export const resetFilters = (state) => {
  for (let field in state) {
    if (typeof state[field] === 'object') {
      resetFilters(state[field]);
    } else {
      state[field] = null;
    }
  }
};
