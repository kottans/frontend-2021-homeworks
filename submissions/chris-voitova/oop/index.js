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
  constructor({ name, greating }) {
    this.name = name;
    this.greating = greating;
  }
  saying() {
    return this.greating;
  }
  toString() {
    let props = Object.entries(this);
    props = props.map(([key, value]) =>
      value && key !== "greating" ? `${key}: ${value}` : null
    );

    return `${props.join(" ")} ${this.saying()}`;
  }
}
class Animal extends Inhabitant {
  constructor({ name, gender, legs = 4, greating, friends }) {
    super({ name, greating });
    this.species = "animal";
    this.gender = gender;
    this.legs = legs;
    this.friends = friends;
  }
}

class Human extends Inhabitant {
  constructor({ name, gender, legs = 2, hands = 2, greating, friends }) {
    super({ name, greating });
    this.species = "human";
    this.legs = legs;
    this.hands = hands;
    this.gender = gender;
    this.friends = friends;
  }
}

class Cat extends Animal {
  constructor({ name, gender, greating, friends }) {
    super({ name, gender, greating, friends });
    this.species = "cat";
  }
}
class Dog extends Animal {
  constructor({ name, gender, greating, friends }) {
    super({ name, gender, greating, friends });
    this.species = "dog";
  }
}
class CatWoman extends Cat {
  constructor({ name, gender, greating, friends }) {
    super({ name, gender, greating, friends });
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}

const cat = new Cat({
        name: "Expert",
        gender: "male",
        greating: "meow!",
      }),
      dog = new Dog({
        name: "Joker",
        gender: "male",
        greating: "woof-woof!",
        friends: [cat.name],
      }),
      man = new Human({
        name: "Mark",
        gender: "male",
        greating: "Hi!",
      }),
      woman = new Human({
        name: "Alice",
        gender: "female",
        greating: "Hello!",
        friends: [cat.name, dog.name, man.name],
      }),
      catWoman = new CatWoman({
        name: "Wonder Alice",
        gender: "female",
        greating: "A am superhero!",
      });

[cat, dog, man, woman, catWoman].forEach((inhabitant) =>
  print(inhabitant, "div")
);
