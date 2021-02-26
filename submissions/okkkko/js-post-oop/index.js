class Inhabitant {
  constructor(species, name, gender, saying, friends, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
    this.legs = legs;
  }
  toString() {
    const properties = ["species", "name", "gender", "saying", "friends", "legs"].map(
      (prop) => `${prop}: ${this[prop]}`
    );
    return properties.join("; ");
  }
}
class Human extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super("human", name, gender, saying, friends, 2);
    this.hands = 2;
  }
  toString() {
    return [
      super.toString(),
      ...["hands"].map((prop) => `${prop}: ${this[prop]}`),
    ].join("; ");
  }
}
class Man extends Human {
  constructor(name, saying, friends) {
    super(name, "male", saying, friends);
  }
}
class Woman extends Human {
  constructor(name, saying, friends) {
    super(name, "female", saying, friends);
  }
}
class Dog extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super("dog", name, gender, saying, friends, 4);
  }
}
class Cat extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super("cat", name, gender, saying, friends, 4);
  }
}
class CatWoman extends Inhabitant {
  constructor(name, friends) {
    super("cat-woman", name, "female", cat.saying, friends, 2);
    this.hands = 2;
  }
  toString() {
    return [
      super.toString(),
      ...["hands"].map((prop) => `${prop}: ${this[prop]}`),
    ].join("; ");
  }
}

const dog = new Dog("Rex", "male", "WOOF!", ["Joey", " Lisa", " Milka"]);
const cat = new Cat("Milka", "female", "meeeow!", ["Selina", " Rex"]);
const man = new Man("Joey", "How you doin'?", ["Rex", " Lisa"]);
const woman = new Woman("Lisa", "Hello!", ["Joey", " Rex", " Selina"]);
const catWoman = new CatWoman("Selina", ["Milka", " Lisa"]);

const inhabitants = [dog, cat, man, woman, catWoman];
inhabitants.forEach((inhabitant) => print(inhabitant));
