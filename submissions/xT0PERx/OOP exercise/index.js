class Mammals {
  constructor(props) {
    this.name = props.name;
    this.saying = props.saying;
  }
  say() {
    return this.saying;
  }
  printInfo() {
    print(
      [
        this.species,
        this.name,
        this.gender,
        this.hands,
        this.legs,
        this.say(),
      ].join('; ')
    );
  }
}

class Animal extends Mammals {
  constructor({ name, gender, legs = 4, saying }) {
    super({ name, saying });
    this.species = 'animal';
    this.gender = gender;
    this.legs = legs;
  }
}

class Human extends Mammals {
  constructor({ name, gender, legs = 2, hands = 2, saying }) {
    super({ name, saying });
    this.species = 'human';
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
  }
}

class Cat extends Animal {
  constructor({ name, gender, saying }) {
    super({ name, gender, saying });
    this.species = 'cat';
  }
}
class Dog extends Animal {
  constructor({ name, gender, saying }) {
    super({ name, gender, saying });
    this.species = 'dog';
  }
}
class Werewolf extends Human {
  constructor({ name, gender, saying }) {
    super({ name, gender, saying });
    this.species = 'werewolf';
    this.legs = 2;
    this.hands = 2;
  }
}

const man = new Human({
    name: 'Bob',
    gender: 'male',
    saying: 'Hi!',
  }),
  woman = new Human({
    name: 'Lara',
    gender: 'female',
    saying: 'Hello!',
  }),
  dog = new Dog({
    name: 'Bobik',
    gender: 'male',
    saying: 'Woof-Woof!',
  }),
  cat = new Cat({
    name: 'Zarina',
    gender: 'female',
    saying: `Meow-Meow`,
  }),
  werewolf = new Werewolf({
    name: 'Dorian',
    gender: 'male',
    saying: `Lingering howl...`,
  });

const inhabitants = [man, woman, dog, cat, werewolf];

inhabitants.forEach((el) => {
  el.printInfo();
});
