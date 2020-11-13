/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details */

const dog = {
    species: "dog",
  },
  cat = {
    species: "cat",
  },
  woman = {
    species: "human",
  },
  man = {
    species: "human",
  },
  catWoman = {
    species: "catWoman",
  };

const introduceSelf = ({
  species,
  name,
  gender,
  legs,
  hands,
  friends,
}) => `Hi! My name is <em>${name}</em> and I'm <em>${species}</em>. 
    My gender is <em>${gender}</em>. I have <em>${legs}</em> legs and <em>${hands}</em> hands. 
    These are my friends: <em>${friends.join(", ")}</em>.<em> 
    </em><br><br>`;

const inhabitantSays = (self) => ({
  introduction: () => {
    return introduceSelf(self);
  },
});

const createInhabitant = ({species}) => {
  let self = {
    species
  };
  return Object.assign(self, inhabitantSays(self));
};

const carnivoraPetSays = (self) => ({
  introduction: () => {
    let word = (self.species === 'dog') ? 'woof' : 'meow';
    let capitalizeWord = word.charAt(0).toUpperCase() + word.slice(1);
    if (self.species === 'catWoman') {
      self.paws = word;
    }
    return `${capitalizeWord}! ${capitalizeWord} ${word} <em>${self.name}</em>. ${capitalizeWord} ${word} <em>${
      self.species
    }</em>. 
      ${capitalizeWord} ${word} <em>${self.gender}</em>. ${capitalizeWord} <em>${self.legs}</em> ${word} <em>${
      self.paws
    }</em> ${word}. 
      Meow ${word} ${word}: <em>${self.friends.join(", ")}</em>.<em> 
      </em><br><br>`;
  },
});

const createCarnivoraPet = (speciesObj) => {
  const self = createInhabitant(speciesObj);
  self.legs = 4;
  self.paws = 4;
  return Object.assign(self);
}

const createHuman = (speciesObj) => {
  const self = createInhabitant(speciesObj);
  self.legs = 2;
  self.hands = 2;
  return Object.assign(self);
}

const createCat = (name, gender, friends) => {
  const self = createCarnivoraPet(cat);
  return Object.assign(self, {name, gender, friends}, carnivoraPetSays(self));
};

const createDog = (name, gender, friends) => {
  const self = createCarnivoraPet(dog);
  return Object.assign(self, {name, gender, friends}, carnivoraPetSays(self));
};

const createMan = (name, friends) => {
  const self = createHuman(man);
  self.gender = "male";
  return Object.assign(self, {name, friends});
};

const createWoman = (name, friends) => {
  const self = createHuman(woman);
  self.gender = "female";
  return Object.assign(self, {name, friends});
};

const createCatWoman = (name, friends) => {
  const self = createWoman(catWoman);
  self.species = "catWoman";
  return Object.assign(self, {name, friends}, carnivoraPetSays(self));
};

const dogSharik = createDog("Sharik", 'male', ['Anna', 'Eugene']);
const catBarsik = createCat("Barsik", 'female', ['Eugene']);
const manEugene = createMan("Eugene", ['Anna', 'Eugene']);
const womanAnna = createWoman("Anna", ['Anna', 'Eugene']);
const catWomanSofia = createCatWoman("Sofia", ['Anna', 'Eugene']);

const inhabitants = [manEugene, womanAnna, catBarsik, catWomanSofia, dogSharik];
const introductions = inhabitants.map(inhabitant => inhabitant.introduction())

introductions.forEach((introduction) => {
  print(introduction, "pre");
});
