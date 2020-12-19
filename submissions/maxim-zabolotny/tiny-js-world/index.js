const phrases = {
  cat: 'Meow!',
  dog: 'bark-bark!',
  man: 'Hello',
  woman: 'Hi ',
};

const cat = {
  species: 'cat',
  name: 'Alex',
  legs: 4,
  saying: phrases.cat,
  gender: 'male',
  friends: 'Kevin, Anna',
};
const catWoman = {
  species: 'cat',
  name: 'Mike',
  legs: 4,
  saying: phrases.cat,
  gender: 'female',
  friends: 'Alex',
};
const dog = {
  species: 'dog',
  name: 'Max',
  legs: 4,
  saying: phrases.dog,
  gender: 'male',
  friends: 'Anna, Alex',
};
const man = {
  species: 'human',
  name: 'Elon',
  hands: 2,
  legs: 2,
  saying: phrases.man,
  gender: 'male',
  friends: 'Alex, Anna',
};
const woman = {
  species: 'human',
  name: 'Anna',
  hands: 2,
  legs: 2,
  saying: phrases.woman,
  gender: 'female',
  friends: 'Alex, Elon',
};
const inhabitants = [cat, catWoman, man, woman, dog];

const makeFormatOutput = ({
  name,
  species,
  hands,
  legs,
  saying,
  gender,
  friends,
}) => {
  return [
    `${saying}, `,
    `I am ${species}, `,
    `my name is ${name}, `,
    `my gender is ${gender}, `,
    `I have ${hands || '0'} arms `,
    `and ${legs} legs. `,
    `My friends: ${friends}.`,
  ].join(' ')
};

inhabitants.forEach((habitant) => print(makeFormatOutput(habitant), 'h5'));
