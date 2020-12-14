/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
	constructor(species, name, gender, saying, legs, hands, friends) {
		this.species = species;
		this.name = name;
		this.gender = gender;
		this.saying = saying;
      this.legs = legs;
      this.hands = hands;
		this.friends = friends;
	}

	toString() {
		let greating = `${this.saying}! I am a ${this.species} and my gender is ${this.gender}. My name is ${this.name}. I have ${this.legs} legs and ${this.hands} hands. `;
		return (this.friends.length > 1)
			? greating += `My friends are ${this.friends}.`
			: this.friends.length === 1
			? greating += `My friend is ${this.friends}.`
			: greating;
   }
}

class Human extends Inhabitant {
   constructor (name, gender, saying, friends) {
      super('human', name, gender, saying, 2, 2, friends || []);
   }
}

class Animal extends Inhabitant {
   constructor (species, name, gender, saying, friends) {
      super(species, name, gender, saying, 4, 'no', friends || []);
   }
}

class Man extends Human {
   constructor (name, saying, friends) {
      super(name, 'male', saying, friends);
   }
}

class Woman extends Human {
   constructor (name, saying, friends) {
      super(name, 'female', saying, friends);
   }
}

class Cat extends Animal {
   constructor (name, gender, friends) {
      super('cat', name, gender, 'Meow', friends);
   }
}

class Dog extends Animal {
   constructor (name, gender, friends) {
      super('dog', name, gender, 'Bow wow', friends);
   }
}

class CatWoman extends Woman {
   constructor (name, saying, friends) {
      super(name, saying, friends);
   }
}

const man = new Man('Sasha', 'Hello World', ['Julia']);
const woman = new Woman('Julia', 'Hi there', ['Sasha', 'Tom', 'Selina']);
const cat = new Cat('Tom', 'male', ['Julia', 'Selina']);
const dog = new Dog('Jack', 'male', ['Julia', 'Tom']);
const catWoman = new CatWoman('Selina', cat.saying, );

const inhabitants = [man, woman, cat, dog, catWoman];

// ======== OUTPUT ========

inhabitants.forEach(individual => print(individual.toString()));

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
