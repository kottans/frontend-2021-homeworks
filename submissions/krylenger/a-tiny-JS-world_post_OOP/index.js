/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details */

const dog = {
    species: "animal",
    legs: 4,
    hands: 0,
    gender: "male",
    friends: ["Anna", "Eugene"],
  },
  cat = {
    species: "animal",
    legs: 4,
    hands: 0,
    gender: "female",
    friends: ["Anna", "Eugene"],
  },
  woman = {
    species: "human",
    legs: 2,
    hands: 2,
    gender: "female",
    friends: ["Eugene", "Murzik", "Sharik"],
  },
  man = {
    species: "human",
    legs: 2,
    hands: 2,
    gender: "male",
    friends: ["Anna", "Murzik", "Sharik"],
  },
  catWoman = {
    species: "cat-woman",
    legs: 2,
    hands: 2,
    gender: "female",
    friends: ["Anna", "Murzik"],
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

const createInhabitant = ({ species, legs, hands, gender, friends }) => {
  let self = {
    species,
    legs,
    hands,
    gender,
    friends,
  };
  return Object.assign(self, inhabitantSays(self));
};

const catSays = (self) => ({
  introduction: () => {
    return `Meow! Meow meow <em>${self.name}</em> meow meow <em>${
      self.species
    }</em>. 
      meow meow <em>${self.gender}</em>. meow <em>${self.legs}</em> meow <em>${
      self.hands
    }</em> meow. 
      Meow meow meow: <em>${self.friends.join(", ")}</em>.<em> 
      </em><br><br>`;
  },
});

const dogSays = (self) => ({
  introduction: () => {
    return `Woof! Woof woof <em>${self.name}</em> woof woof <em>${
      self.species
    }</em>. 
      woof woof <em>${self.gender}</em>. woof <em>${self.legs}</em> woof <em>${
      self.hands
    }</em> woof. 
      Woof woof woof: <em>${self.friends.join(", ")}</em>.<em> 
      </em><br><br>`;
  },
});

const createCat = (name) => {
  const self = createInhabitant(cat);
  self.name = name;
  return Object.assign(self, catSays(self));
};

const createDog = (name) => {
  const self = createInhabitant(dog);
  self.name = name;
  return Object.assign(self, dogSays(self));
};

const createMan = (name) => {
  const self = createInhabitant(man);
  self.name = name;
  return Object.assign(self);
};

const createWoman = (name) => {
  const self = createInhabitant(woman);
  self.name = name;
  return Object.assign(self);
};

const createCatWoman = (name) => {
  const self = createInhabitant(catWoman);
  self.name = name;
  return Object.assign(self, catSays(self));
};

const dogSharik = createDog("Sharik");
const catBarsik = createCat("Barsik");
const manEugene = createMan("Eugene");
const womanAnna = createWoman("Anna");
const catWomanSofia = createCatWoman("Sofia");

const inhabitants = [manEugene, womanAnna, catBarsik, catWomanSofia, dogSharik];
const introductions = inhabitants.map(inhabitant => inhabitant.introduction())

introductions.forEach((introduction) => {
  print(introduction, "pre");
});
