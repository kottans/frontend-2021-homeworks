/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const inhabitant = {
	toString: function () {
		let message = `${this.saying}! I'm a ${this.species} and my gender is ${this.gender}. My name is ${this.name} and I have ${this.legs} legs`;
		return this.hands ? (message += ` and ${this.hands} hands`) : message;
	},
};

const human = Object.create(inhabitant);
human.species = "human";
human.legs = 2;
human.hands = 2;

const man = Object.create(human);
man.gender = "male";
man.name = "Sasha";
man.saying = "Hello World";

const woman = Object.create(human);
woman.gender = "female";
woman.name = "Julia";
woman.saying = "Hi there";

const animal = Object.create(inhabitant);
animal.legs = 4;

const cat = Object.create(animal);
cat.species = "cat";
cat.gender = "male";
cat.name = "Tom";
cat.saying = "Meow-meow";

const dog = Object.create(animal);
dog.species = "dog";
dog.name = "Jack";
dog.gender = "male";
dog.saying = "Bow wow";

const catWoman = Object.create(woman);
catWoman.name = "Selina";
catWoman.saying = cat.saying;

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
