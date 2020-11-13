/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Habitant {
  constructor(species, name, gender, phrase, friends = [], legs, hands) {
    this.species = species;
    this.legs = legs;
    this.hands = hands;
    this.name = name;
    this.gender = gender;
    this.phrase = phrase;
    this.friends = friends;
    //this.addFriends(friends);
  }

  addFriends(newFriend) {
    this.friends.pop(newFriend);
  }

  listFriends() {
    return this.friends.length
      ? this.friends.map((friend) => friend).join(", ")
      : "I am loner";
  }

  sayPhrase() {
    return this.phrase;
  }

  toString() {
    return `Hi! I am <strong>${this.species}</strong>, my name is <strong>${
      this.name
    }</strong>, my gender is <strong>${this.gender}</strong>, I have <strong>${
      this.legs
    }</strong> legs and <strong>${this.hands}</strong> hands. 
     My friends: <strong>${this.listFriends()}</strong> and my phrase: <strong>${this.sayPhrase()}</strong>`;
  }
}

class Dog extends Habitant {
  constructor(name, gender, phrase, friends, legs = 4, hands = 0) {
    super("dog", name, gender, phrase, friends, legs, hands);
  }
  toString() {
    return super.toString();
  }
  sayPhrase() {
    return super.sayPhrase();
  }
  addFriends(newFriend) {
    super.addFriends(newFriend);
  }
  listFriends() {
    return super.listFriends();
  }
}
class Cat extends Habitant {
  constructor(name, gender, phrase, friends, legs = 4, hands = 0) {
    super("cat", name, gender, phrase, friends, legs, hands);
  }
  toString() {
    return super.toString();
  }
  sayPhrase() {
    return super.sayPhrase();
  }
  addFriends(newFriend) {
    super.addFriends(newFriend);
  }
  listFriends() {
    return super.listFriends();
  }
}
class Human extends Habitant {
  constructor(name, gender, phrase, friends, legs = 2, hands = 2) {
    super("human", name, gender, phrase, friends, legs, hands);
  }
  toString() {
    return super.toString();
  }
  sayPhrase() {
    return super.sayPhrase();
  }
  addFriends(newFriend) {
    super.addFriends(newFriend);
  }
  listFriends() {
    return super.listFriends();
  }
}
const dog = new Dog("Snoop", "male", "Woof!", ["Ban", "July"]);
const cat = new Cat("Fluffy", "female", "Meow!", ["July"]);
const man = new Human("Ban", "male", "Hello everybody.");
const woman = new Human("July", "female", "Blah blah blah.", [
  "Ban",
  "Fluffy",
  "Snoop",
]);

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
print(dog);
print(cat);
print(man);
print(woman);
