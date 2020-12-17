/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
	constructor(species, name, gender, saying, friends = []) {
		this.species = species;
		this.name = name;
		this.gender = gender;
		this.saying = saying;
		this.friends = friends;
	}

	toString() {
		let greating = [
			`${this.saying}`,
			`I am a ${this.species}`,
			`My gender is ${this.gender}`,
			`My name is ${this.name}`,
		];

		if (this.friends.length > 1) {
			greating.push(`My friends are ${this.friends.join(", ")}`);
		} else if (this.friends.length === 1) {
			greating.push(`My friend is ${this.friends}`);
		}
		return greating.join(". ");
	}
}

class Animal extends Inhabitant {
	constructor(species, name, gender, saying, friends) {
		super(species, name, gender, saying, friends);
		this.legs = 4;
	}
	toString() {
		return [super.toString(), `I have ${this.legs} legs`].join(". ");
	}
}

class Human extends Animal {
	constructor(name, gender, saying, friends) {
		super("human", name, gender, saying, friends);
		this.legs = 2;
		this.hands = 2;
	}
	toString() {
		return [super.toString(), `I have ${this.hands} hands`].join(". ");
	}
}

class Man extends Human {
	constructor(name, saying, friends) {
		super(name, "male", saying, friends);
	}
}

class Woman extends Human {
	constructor(name, saying, friends) {
		super(name, "female", saying, friends);
	}
}

class Cat extends Animal {
	constructor(name, gender, friends) {
		super("cat", name, gender, "Meow", friends);
	}
}

class Dog extends Animalmal {
	constructor(name, gender, friends) {
		super("dog", name, gender, "Bow wow", friends);
	}
}

class CatWoman extends Woman {
	constructor(name, saying = cat.saying, friends) {
		super(name, saying, friends);
	}
}

const man = new Man("Sasha", "Hello World", ["Julia"]);
const woman = new Woman("Julia", "Hi there", ["Sasha", "Tom", "Selina"]);
const cat = new Cat("Tom", "male", ["Julia", "Selina"]);
const dog = new Dog("Jack", "male", ["Julia", "Tom"]);
const catWoman = new CatWoman("Selina");

const inhabitants = [man, woman, cat, dog, catWoman];

// ======== OUTPUT ========

inhabitants.forEach((item) => print(item.toString()));

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
