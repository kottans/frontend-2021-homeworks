const makeUserHtml = (user) => {
  const li = document.createElement("li");
  li.classList.add("user-card");

  const userName = `${user.name.first} ${user.name.last}`;

  li.innerHTML = `
  <h3 class="user-card__user-name">${userName}</h3>
  <img class="user-card__user-photo" src="${user.picture.large}" alt="photo of ${userName}"}>
  <ul class="user-card__info-list">
    <li >Gender: ${user.gender}</li>
    <li>Age: ${user.dob.age}</li>
    <li class="user-card__user-email"><a  href="mailto:${user.email}" tabindex="-1">${user.email}</a></li>
    <li class="user-card__user-tel"><a href="tel:${user.cell}" tabindex="-1">${user.cell}</a></li>
    <li class="user-card__user-city">${user.location.city}</li>
  </ul>
  `;

  return li;
};

const truncateField = (field, maxLenghOfField, ending) => {
  return field.length > maxLenghOfField
    ? field.substring(0, maxLenghOfField - ending.length) + ending
    : field;
};

export const makeUsersList = (users) => {
  const list = document.createElement("ul");
  list.classList.add("users-list");
  const domElements = users.map(makeUserHtml);
  list.append(...domElements);
  return list;
};
