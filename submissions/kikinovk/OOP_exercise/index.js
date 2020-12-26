/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Being {
   constructor(name, gender, saying) {

      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.friends = [];
   };

   addFriends(arr) {
      arr.forEach(item => this.friends.push(item));
   };

   toString() {
      let descriptions = [this.saying,
         `my name is ${this.name}`,
         `I am ${this.gender}`,
         `${this.friends.length > 0
            ? `My friends is ${ this.friends.map(item => item.name).join(' and ')}`
            : 'I have not got friends'}`
      ];
      return  descriptions.join(', ')
   };
};

class Animal extends Being {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.paws = 4;
   };
   toString() {
      return `${super.toString()}, I have ${this.paws} paws`
   }
};

class Human extends Being {
   constructor(name, gender = 'male', saying) {
      super(name, gender, saying);
      this.legs = 2;
      this.hands = 2;
      this.species = 'human';
   };
   toString() {
      return `${super.toString()}, I have ${this.hands} hands and ${this.legs} legs, I am a ${this.species}`
   };
};

class Dog extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.species = 'dog';
   };
   toString() {
      return `${super.toString()}, I am a ${this.species}`
   };
};

class Cat extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.species = 'cat';
   };
   toString() {
      return `${super.toString()}, I am a ${this.species}`
   };
};

class SuperHero extends Human {
   constructor(name, gender, saying, species = 'cat-woman') {
      super(name, gender, saying);
      this.species = species;
   };
}

const dog = new Dog ('Charlie', 'male', 'woof-woof!');
const cat = new Cat ('Taffy', 'female', 'meow!');
const man = new Human ('Bruce', 'male', 'Hi!');
const woman = new Human ('Emma', 'female', 'Hello!');
const catWoman = new SuperHero ('Patience', 'female', cat.saying);


dog.addFriends([man, woman]);
cat.addFriends([man, woman, catWoman]);
man.addFriends([woman, dog, cat, catWoman]);
woman.addFriends([dog, cat, man]);

const   inhabitants = [dog, cat, man, woman, catWoman];


// // ======== OUTPUT ========

inhabitants.forEach(obj => print(obj.toString()));


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
