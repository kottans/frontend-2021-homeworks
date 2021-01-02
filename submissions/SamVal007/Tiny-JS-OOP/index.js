/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Person {
  constructor(species, gender, name, speach, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.speach = speach;
    this.legs = legs;
  }

  saySpeach() {
    const sayingSpeach = [
      this.speach,
      `I am a ${this.species}.`,
      `My name is ${this.name}.`,
      `My gender is ${this.gender}.`,
      `I have ${this.legs} legs.`
    ];
    return sayingSpeach.join(' ');
  }

}

class Dog extends Person {
  constructor(name, gender, speach, legs = 4) {
    super("dog", name, gender, speach, legs);
  }
}
class Cat extends Person {
  constructor(name, gender, speach, legs = 4) {
    super("cat", name, gender, speach, legs);
  }
}
class Human extends Person {
  constructor(name, gender, speach, friends, legs = 2, hands = 2) {
    super("human", name, gender, speach, friends, legs, hands);
    this.legs = legs;
    this.hands = hands;

  }

  saySpeach() {
    return `${super.saySpeach()} I hvae ${this.hands} hands.`
  }
}
const dog = new Dog("male", "Sharik", "Wow-Wow!");
const cat = new Cat("female", "Umka", "Meow!");
const man = new Human("male", "Valerii", "Bongiorno!");
const woman = new Human("female", "Liza", "Tere hommikust!");

// ======== OUTPUT ========

const persons = [man, woman, dog, cat];

persons.forEach((person) => print(person.saySpeach()));
