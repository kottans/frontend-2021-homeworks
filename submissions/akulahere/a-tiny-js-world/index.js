const dog = {
  species: 'dog',
  name: 'Toby',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!'
};
const cat = {
  species: 'cat',
  name: 'Sheldon',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'mrrr!'
};
const man = {
  species: 'human',
  name: 'Dmitry',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hello!'
};
const woman = {
  species: 'human',
  name: 'Lero',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Bye!'
};

const inhabitantsArray = [dog, cat, man, woman];
const properties = ['species', 'name', 'gender', 'legs', 'hands', 'saying']
const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const makeMessage = (inhabitant) => properties.map(property => `${capitalizeString(property)}: ${inhabitant[property]}.`).join(' ');
inhabitantsArray.forEach(inhabitant => print(makeMessage(inhabitant)));
