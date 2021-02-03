export default (user) => `
<div class="contact-card">
  <img src="${user.picture}" alt="user-photo" class="user-photo" />
  <div class="info-block">
    <p>${user.name}</p>
    <p><span>email: </span>&nbsp;${user.email}</p>
    <p><span>city: </span>${user.city}</p>
    <p><span>date of birth: </span>${user.dob}</p>
    <p><span>age: </span>${user.age}</p>
    <p><span> phone: </span>${user.phone}</p>
  </div>
</div>
`;
