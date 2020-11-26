/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Habitant {
  constructor(species, name, gender, phrase, friends = [], legs) {
    this.species = species;
    this.legs = legs;
    this.name = name;
    this.gender = gender;
    this.phrase = phrase;
    this.friends = friends;
    this.addFriends(friends);

    [
      this.speciesProp,
      this.nameProp,
      this.genderProp,
      this.phraseProp,
      this.legsProp,
    ] = ["species", "name", "gender", "phrase", "legs"].map(
      (prop) => `<strong>${this[prop]}</strong>`
    );
  }

  addFriends(friends) {
    this.friends = [...this.friends, ...friends];
  }

  listFriends() {
    return this.friends.length
      ? this.friends.map((friend) => friend.name)
      : "I am loner";
  }

  sayPhrase() {
    return this.phrase;
  }

  toString() {
    return `Hi! I am ${this.speciesProp}, my name is ${
      this.nameProp
    }, my gender is ${this.genderProp}.
    My phrase: ${
      this.phraseProp
    } Friends: <strong>${this.listFriends()}</strong>. I have ${
      this.legsProp
    } legs `;
  }
}

class Dog extends Habitant {
  constructor(name, gender, phrase, friends, legs = 4) {
    super("dog", name, gender, phrase, friends, legs);
  }
}
class Cat extends Habitant {
  constructor(name, gender, phrase, friends, legs = 4) {
    super("cat", name, gender, phrase, friends, legs);
  }
}
class Human extends Habitant {
  constructor(name, gender, phrase, friends, legs = 2, hands = 2) {
    super("human", name, gender, phrase, friends, legs, hands);
    this.hands = hands;
    [
      this.speciesProp,
      this.nameProp,
      this.genderProp,
      this.phraseProp,
      this.legsProp,
      this.handsProp,
    ] = ["species", "name", "gender", "phrase", "legs", "hands"].map(
      (prop) => `<strong>${this[prop]}</strong>`
    );
  }

  toString() {
    return super.toString() + `and ${this.handsProp} hands.`;
  }
}
const dog = new Dog("Snoop", "male", "Woof!");
const cat = new Cat("Fluffy", "female", "Meow!");
const man = new Human("Ban", "male", "Hello everybody.");
const woman = new Human("July", "female", "Blah blah blah.");

cat.friends = [woman];
dog.friends = [cat, man, woman];

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
const habitants = [man, woman, dog, cat];

habitants.forEach((habitant) => print(habitant));
