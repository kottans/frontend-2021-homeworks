function createResident({ species, legs, name, gender, saying, friends = 'No friends' }) {
  const props = { species, legs, name, gender, saying, friends };
  return {
    ...props,
    ...toString(),
  };
}

const toString = () => ({
  toString() {
    return Object.entries(this)
      .filter((item) => typeof item[1] !== 'function')
      .map((item) => `${item[0]}: ${item[1]};`)
      .join(' ');
  },
});

function createCat({ species = 'cat', legs = 4, name, gender, friends }) {
  return {
    ...createResident({ species, legs, name, gender, friends }),
    ...catSay(),
  };
}

function catSay() {
  return {
    saying: 'meow-meow',
  };
}

function createDog({ species = 'dog', legs = 4, saying = 'bark-bark', name, gender, friends }) {
  return {
    ...createResident({ species, legs, name, gender, friends, saying }),
  };
}

function createHuman({ species = 'human', legs = 2, hands = 2, saying, name, gender, friends }) {
  return {
    ...createResident({ species, legs, name, gender, friends, saying }),
    ...{ hands },
  };
}

function createCatWoman({  species = 'cat-woman',  legs,  hands, name, gender = 'female', friends }) {
  return {
    ...createHuman({ species, legs, hands, name, gender, friends }),
    ...catSay(),
  };
}

const cat = createCat({
  name: 'Meowler',
  gender: 'male',
  friends: 'Dude, Alice, Fur',
});
const dog = createDog({
  name: 'Doggy',
  gender: 'male',
  friends: 'Alice',
});
const man = createHuman({
  name: 'Dude',
  gender: 'male',
  saying: "Hey! What's up?",
  friends: 'Alice, Meowler',
});
const woman = createHuman({
  name: 'Alice',
  gender: 'female',
  saying: 'What a nice place!',
  friends: 'Dude, Meowler, Doggy',
});
const catWoman = createCatWoman({
  name: 'Fur',
  friends: 'Meowler',
});

const inhabitants = [dog, cat, man, woman, catWoman];

inhabitants.forEach((elem) => printElement(elem.toString()));
