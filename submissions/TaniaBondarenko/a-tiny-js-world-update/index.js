class Inhabitant {
  constructor(name, gender, saying, friends) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }
  toString() {
    return (` I\'m <b>${this.name}</b>, a ${this.gender}. To my friend ${this.friends} I always say: "${this.saying}"`);
  }
};

class Person extends Inhabitant {
  constructor(name, gender, saying, friends, species='human', legs=2, hands=2) {
    super(name, gender, saying, friends)
    this.species = species;
    this.legs = legs;
    this.hands = hands;
  }
  toString() {
    return `Since I'm <em>${this.species}</em>,I have ${this.legs} legs and ${this.hands} hands.` + super.toString();
  } 
};

class Animal extends Inhabitant {
  constructor(name, gender, saying, species, friends, legs=4, hands=0) {
    super(name, gender, saying, friends )
    this.species = species;
    this.legs = legs;
    this.hands = hands;
  }
  toString() {
    return `Since I'm <em>${this.species}</em>, I have ${this.legs} legs and ${this.hands} hands.` + super.toString();
  } 
};

class Creature extends Person{
  constructor(name, gender, saying, friends, species = 'half-human', legs = 2, hands = 2) {
    super (name, gender, saying, friends, species, legs=2, hands=2) 
  }
  toString() {
    return super.toString();
  } 
};

const cat = new Animal("Toby", "male","Meow! Feed me!","cat", "some human");
const man = new Person("Bill", "male","Hi!", "Beverly");
const woman = new Person("Beverly", "female","What a nice day!",man.name);
const dog = new Animal("Rex", "male", "Woof-woof!","dog", woman.name);
const catWoman = new Creature("Maggie", "female",cat.saying,cat.name);

const arrOfInhabitants = [man, woman, dog, cat, catWoman];

arrOfInhabitants.forEach((el) => { print(el.toString(),'div') });

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


