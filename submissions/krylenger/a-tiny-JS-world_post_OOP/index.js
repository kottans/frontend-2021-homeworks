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

const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const createInhabitant = ({species}) => {
  let self = {
    species
  };
  return Object.assign(self);
};

const outputHumanIntroduction = ({
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

const outputPetIntroduction = ({
  word,
  name,
  gender,
  legs,
  friends,
  species,
}) => {
  const capitalizedWord = capitalizeWord(word);

  return `${capitalizedWord}! ${capitalizedWord} ${word} <em>${name}</em>. ${capitalizedWord} ${word} <em>${species}</em>.
      ${capitalizedWord} ${word} <em>${gender}</em>. ${capitalizedWord} <em>${legs}</em> ${word} ${word}. 
      Meow ${word} ${word}: <em>${friends.join(", ")}</em>.<em> 
      </em><br><br>`;
};

const humanSays = (self) => ({
  toString: () => {
    return outputHumanIntroduction(self);
  },
});

const carnivoraPetSays = (self) => ({
  toString: () => { 
    return outputPetIntroduction(self);
  },
});

const createCarnivoraPet = (speciesObj) => {
  const self = createInhabitant(speciesObj);
  self.legs = 4;
  return Object.assign(self, carnivoraPetSays(self));
}

const createHuman = (speciesObj) => {
  const self = createInhabitant(speciesObj);
  self.legs = 2;
  self.hands = 2;
  return Object.assign(self, humanSays(self));
}

const meower = () => ({
  word: 'meow'
})

const woofer = () => ({
  word: 'woof'
})

const createCat = (name, gender, friends) => {
  return Object.assign(createCarnivoraPet(cat), meower(), {name, gender, friends});
};

const createDog = (name, gender, friends) => {
  return Object.assign(createCarnivoraPet(dog), woofer(), {name, gender, friends});
};

const createMan = (name, friends) => {
  return Object.assign(createHuman(man), {gender: 'male', name, friends});
};

const createWoman = (name, friends) => {
  return Object.assign(createHuman(woman), {gender: 'female', name, friends});
};

const createCatWoman = (name, friends) => {
  const self = Object.assign(createWoman(catWoman), createInhabitant(catWoman));
  return Object.assign(self, {name, friends}, meower(), carnivoraPetSays(self));
};

const dogSharik = createDog("Sharik", 'male', ['Anna', 'Eugene']);
const catBarsik = createCat("Barsik", 'female', ['Eugene']);
const manEugene = createMan("Eugene", ['Anna', 'Eugene']);
const womanAnna = createWoman("Anna", ['Anna', 'Eugene']);
const catWomanSofia = createCatWoman("Sofia", ['Anna', 'Eugene']);

const inhabitants = [manEugene, womanAnna, catBarsik, catWomanSofia, dogSharik];
inhabitants.forEach(inhabitant => print(inhabitant))
  