/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const male = 'male'
const female = 'female'

class Inhabitant {
  constructor(species, name, legs, gender, message) {
    this.species = species
    this.name = name
    this.legs = legs
    this.gender = gender
    this.message = message
    this.friendship = null
  }

  get aboutMe() {
    return `I'm a ${this.species}. My name is ${this.name}. I'm a ${this.gender === male ? 'boy' : 'girl'}. I say: ${this.message} `
      + (this.friendship ? "I'm friends with " + this.friendship.map(elem => elem.name).join(', ') + '. ' : "I don't have friends. ")
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, message) {
    super(species, name, 4, gender, message)
  }
  get aboutMe() {
    return super.aboutMe
      + `I have ${this.legs} cute paws.`
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super('dog', name, gender, 'Bark!')
  }
  get aboutMe() {
    return "Bark!" + super.aboutMe
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super('cat', name, gender, 'Meow!')
  }

  get aboutMe() {
    return 'Meow!' + super.aboutMe
  }
}

class Human extends Inhabitant {
  constructor(name, gender, message) {
    super('human', name, 2, gender, message)
    this.hands = 2
  }

  get aboutMe() {
    return super.aboutMe + `I have ${this.hands} hands.`
  }
}

const dog = new Dog('Tina', female)
const cat = new Cat('Tom', male)
const boy = new Human('James', male, 'Wow, I love that new JS method you wrote!')
const girl = new Human('Jeany', female, 'This is an amazing CSS property!')

dog.friendship = [boy, girl, cat]
boy.friendship = [girl, cat]
girl.friendship = [boy, dog]



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

const inhabitants = [dog, girl, cat, boy]

inhabitants.forEach(elem => print(elem.aboutMe))
