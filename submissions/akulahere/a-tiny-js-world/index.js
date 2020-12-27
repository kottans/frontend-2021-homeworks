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

const message = (elem) => `Species: ${elem.species}. Name: ${elem.name}. Gender: ${elem.gender}. ${elem.legs} legs and ${elem.hands} hands. Phrase: ${elem.saying}`;

inhabitantsArray.forEach( inh => print(message(inh)) );



