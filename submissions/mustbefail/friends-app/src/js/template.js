const makeCardTemplate = (name, email, city, dob, age, phone, picture) => `
<div class="contact-card">
  <img src="${picture}" alt="user-photo" class="user-photo" />
  <div class="info-block">
    <p>${name.title}. ${name.first} ${name.last}</p>
    <p><span>email: </span>&nbsp;${email}</p>
    <p><span>city: </span>${city}</p>
    <p><span>date of birth: </span>${dateFormat(dob)}</p>
    <p><span>age: </span>${age}</p>
    <p><span> phone: </span>${phone}</p>
  </div>
</div>
`;

const dateFormat = (dob) => {
  const d = new Date(dob);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da}-${mo}-${ye}`;
};

export default makeCardTemplate;
