/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
      Web app: https://samval007.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Person {
  constructor(species, name, gender, speech, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.speech = speech;
    this.legs = legs;
  }

  say() {
    const say = [
      this.speech,
      `I am a ${this.species}.`,
      `My name is ${this.name}.`,
      `My gender is ${this.gender}.`,
      `I have ${this.legs} legs.`
    ];
    return say.join(' ');
  }

}

class Dog extends Person {
  constructor(name, gender, speech) {
    super("dog", name, gender, speech, 4);

  }
  say() {
    return `${super.say()} Pets are friendly to all!`
  }
}
class Cat extends Person {
  constructor(name, gender, speech) {
    super("cat", name, gender, speech, 4);
  }
  say() {
    return `${super.say()} Pets are friendly to all!`
  }
}
class Human extends Person {
  constructor(name, gender, speech, friends) {
    super("human", name, gender, speech, 2); // '2' - here it's numb of legs
    this.hands = 2;
    this.friends = friends;
  }
  say() {
    return `${super.say()} I have ${this.hands} hands. I am friendly with ${this.friends? this.friends.join(", ") : "nobody"}.`
  }
}
const dog = new Dog("Sharik", "male", "Wow-Wow!");
const cat = new Cat("Umka", "female", "Meow!");
const man = new Human("Valerii", "male", "Bongiorno!", ['cat', 'dog']);
const woman = new Human("Liza", "female", "Tere hommikust!");

// ======== OUTPUT ========

const persons = [man, woman, dog, cat];

persons.forEach((person) => print(person.say()));
