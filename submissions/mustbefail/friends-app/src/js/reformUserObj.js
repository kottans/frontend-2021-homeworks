const convertDate = (date) => new Date(date);

const formatDate = (dob) => {
  const date = convertDate(dob);
  return new Intl.DateTimeFormat().format(date);
};

const getFullName = (name) => {
  return `${name.first} ${name.last}`;
};

export default (user) => ({
  name: getFullName(user.name),
  dob: formatDate(user.dob.date),
  age: user.dob.age,
  phone: user.phone,
  email: user.email,
  picture: user.picture.large,
  city: user.location.city,
  registered: convertDate(user.registered.date),
  gender: user.gender,
});
