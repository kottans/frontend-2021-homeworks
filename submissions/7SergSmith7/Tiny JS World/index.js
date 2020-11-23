/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Habitant {
  constructor(species, name, gender, phrase, friends = [], legs, props = []) {
    this.species = species;
    this.legs = legs;
    this.name = name;
    this.gender = gender;
    this.phrase = phrase;
    this.friends = friends;
    this.addFriends(friends);
    this.props = props;
    this.addProps();
  }
  addProps() {
    this.props = ["species", "legs", "name", "gender", "phrase"];
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
    this.props = this.props.map((prop) => `<strong>${this[prop]}</strong>`);

    return `Hi! I am ${this.props[0]}, my name is ${
      this.props[2]
    }, my gender is ${this.props[3]}.
    My phrase: ${
      this.props[4]
    } Friends: <strong>${this.listFriends()}</strong>. I have ${
      this.props[1]
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
  constructor(name, gender, phrase, friends, legs = 2, hands = 2, props) {
    super("human", name, gender, phrase, friends, legs, hands, props);
    this.hands = hands;
    // this.props.push("hands");
  }
  addProps() {
    super.addProps();
    this.props.push("hands");
  }
  toString() {
    return super.toString() + `and  have ${this.props[5]} hands`;
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
