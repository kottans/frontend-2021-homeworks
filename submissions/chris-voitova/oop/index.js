/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here


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

class Inhabitant {
  constructor(name, gender, friends = "", legs = 4, species = "unknown") {
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.species = species;
    this.friends = friends;
  }
  saying() {
    return "Hi!";
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "cat";
  }
  saying() {
    return "meow!";
  }
}
class Dog extends Inhabitant {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "dog";
  }
  saying() {
    return "woof-woof!";
  }
}
class Human extends Inhabitant {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}
class CatWoman extends Cat {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}

const cat = new Cat("Expert", "male");
const dog = new Dog("Joker", "male", [cat.name]);
const man = new Human("Mark", "male");
const woman = new Human("Alice", "female", [cat.name, dog.name, man.name]);
const catWoman = new CatWoman("Wonder Alice", "female");

function preparePrint({ species, name, gender, legs, hands, saying, friends }) {
  const hasFriends = friends && friends.length > 0;
  return `
   <strong>${species}</strong>;
   name: <strong>${name}</strong>;
   gender: ${gender};
   legs: ${legs};
   saying: ${saying()};
   ${hands ? `hands: ${hands}` : ""}
	${hasFriends ? `friends: ${friends}` : ""}`;
}

[cat, dog, man, woman, catWoman].forEach((item) =>
  print(preparePrint(item), "div")
);
