/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andrewklmn/a-tiny-JS-world
   Web app: https://andrewklmn.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const Inhabitant = function ({species, name, gender, legs = 0, hands = 0, saying, friends = [] }) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.legs = legs;
  this.hands = hands;
  this.saying = saying;
  this.friends = friends;
};
Inhabitant.prototype.getFriendsList = function () {
  if (this.friends.length > 0) {
    return this.friends.map(friend => friend.name).join(', ');
  };
  return 'No friends!';
};
Inhabitant.prototype.toString = function () {
  return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${this.hands}; ${this.saying}; ${this.getFriendsList()}`;
};

const Pet = function ({ species, name, gender, saying }) {
  const legs = 4;
  Inhabitant.call(this, { species, name, gender, legs, saying });
};
Pet.prototype = Object.create( Inhabitant.prototype);
Pet.prototype.constructor = Inhabitant;

const Dog = function ({ name, gender }) {
  const species = 'dog';
  const saying = 'woof!';
  Pet.call(this, {species, name, gender, saying});
};
Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Pet;

const Cat = function ({ name, gender }) {
  const species = 'cat';
  const saying = 'meow!';
  Pet.call(this, {species, name, gender, saying});
};
Cat.prototype = Object.create(Pet.prototype);
Cat.prototype.constructor = Pet;

const Human = function ({ name, gender, saying}) {
  const species = 'human';
  const legs = 2;
  const hands = 2;
  Inhabitant.call(this, { species, name, gender, legs, hands, saying });
};
Human.prototype = Object.create( Inhabitant.prototype);
Human.prototype.constructor = Inhabitant;


const dog = new Dog({ name: 'Dyuka', gender: 'male' });
const cat = new Cat({ name: 'Barsik', gender: 'male' });
const woman = new Human({ name: 'Leeloo Dallas', gender: 'female', saying: 'People hi!' });
const man = new Human({ name: 'Korben Dallas', gender: 'male', saying: 'Hello there!' });

// define cat-woman
const catWoman = Object.create(woman);
catWoman.name = 'Cat-woman';
catWoman.saying = cat.saying;

const inhabitants = [
  dog,
  cat,
  woman,
  catWoman,
  man,
];

// define friends for everyone except the cat...
dog.friends = [man, woman, cat];
woman.friends = [man, dog, cat];
man.friends = [woman, dog, cat, catWoman];
catWoman.friends = [cat];

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

  // ... other objects ...
  inhabitants.forEach( creature => {
    print(creature.toString());
  });

  // ... other print-outs ...

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
