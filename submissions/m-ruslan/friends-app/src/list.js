const makeUserHtml = (user) => {
  const li = document.createElement("li");
  li.classList.add("user-card");

  const name = `${user.name.first} ${user.name.last}`;
  const email = `${user.email}`;
  const city = `${user.location.city}`;

  const maxLengthOfName = 15;
  const maxLengthOfEmail = 25;
  const maxLengthOfCity = 18;

  const ending = "...";

  const truncatedName = truncateField(name, maxLengthOfName, ending);
  const truncatedEmail = truncateField(email, maxLengthOfEmail, ending);
  const truncatedCity = truncateField(city, maxLengthOfCity, ending);

  li.innerHTML = `
  <h3 class="user-card__user-name">${truncatedName}</h3>
  <img class="user-card__user-photo" src="${user.picture.large}" alt="photo of ${name}"}>
  <ul class="user-card__info-list">
    <li >Gender: ${user.gender}</li>
    <li>Age: ${user.dob.age}</li>
    <li class="user-card__user-email"><a href="mailto:${user.email}" tabindex="-1">${truncatedEmail}</a></li>
    <li class="user-card__user-tel"><a href="tel:${user.cell}" tabindex="-1">${user.cell}</a></li>
    <li>${truncatedCity}</li>
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
