const man = {
  species: 'human',
  name: 'Jon',
  age: 25,
  gender: 'male',
  legs: 2,
  hands: 2,
  say: 'Winter is coming!',
  friends: ['Ghost', 'Ygritte']
};

const woman = {
  species: 'human',
  name: 'Ygritte',
  age: 25,
  gender: 'female',
  legs: 2,
  hands: 2,
  say: 'You Know Nothing, Jon Snow!',
  friends: ['Jon']
};

const direwolf = {
  species: 'direwolf',
  name: 'Ghost',
  gender: 'male',
  legs: 4,
  hands: 0,
  say: 'woof-woof!'
};

const cat = {
  species: 'cat',
  name: 'Tiger',
  age: 1,
  gender: 'female',
  legs: 4,
  hands: 0,
  say: 'meow!',
};

const catWoman = {
  species: 'human',
  name: 'CatWoman',
  age: 30,
  gender: 'female',
  legs: 2,
  hands: 2,
  say: cat.say,
};

const inhabitants = [man, woman, direwolf, cat, catWoman];

const makeMessage = (obj) => {
  let friends = '';
  if (obj.hasOwnProperty(friends) && obj.friends.length > 0) {
    friends = obj.friends.join(', ');
  }

  return [
    `${obj.species}`,
    `<strong>${obj.name}</strong>`,
    `${obj.gender}`,
    `${obj.legs}`,
    `${obj.hands}`,
    `${obj.say}`,
    `${friends}`,
  ].join('; ')
};

inhabitants.forEach(obj => print(makeMessage(obj)));
