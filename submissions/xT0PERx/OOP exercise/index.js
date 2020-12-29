class Mammal {
  constructor(name, gender, friend, saying, species, legs) {
    this.name = name;
    this.gender = gender;
    this.friend = friend;
    this.saying = saying;
    this.species = species;
    this.legs = legs;
  }
  toString() {
    return [
      this.name,
      this.gender,
      this.friend,
      this.saying,
      this.species,
      this.legs,
    ].join(";");
  }
}

class Human extends Mammal {
  constructor(
    name,
    gender,
    friend,
    saying,
    species = "human",
    legs = 2,
    hands = 2
  ) {
    super(name, gender, friend, saying, species, legs);
    this.hands = hands;
  }
  toString() {
    return [super.toString(), this.hands].join(";");
  }
}

class Cat extends Mammal {
  constructor(name, gender, saying, friend, species = "cat", legs = 4) {
    super(name, gender, friend, saying, species, legs);
  }
  toString() {
    return super.toString();
  }
}
class Dog extends Mammal {
  constructor(name, gender, saying, species = "dog", friend, legs = 4) {
    super(name, gender, friend, saying, species);
    this.legs = legs;
  }
  toString() {
    return super.toString();
  }
}
class Werewolf extends Human {
  constructor(name, gender, saying, friend, species, transforms) {
    super(name, gender, friend, saying, species);
    this.transforms = transforms;
  }
  toString() {
    return [super.toString(), this.transforms].join(";");
  }
}

const man = new Human("Bob", "male", "Bobik", "Hi!");
const woman = new Human("Lara", "female", "Zarina", "Hello!");
const dog = new Dog("Bobik", "male", "Woof-Woof", "Bob");
const cat = new Cat("Zarina", "female", `Meow-Meow`, "Lara");
const werewolf = new Werewolf(
  "Dorian",
  "male",
  `Lingering howl!`,
  "Bobik",
  "werewolf",
  "full moon"
);

const inhabitants = [man, woman, dog, cat, werewolf];

inhabitants.forEach((inhabitant) => print(inhabitant));
