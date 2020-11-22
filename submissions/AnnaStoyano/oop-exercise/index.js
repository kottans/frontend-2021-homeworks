/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Mammal {
   constructor(species, name, gender, legs, friends, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.friends = friends;
      this.saying = saying;
   }

   tellAbout(properties) {
      let propertiesForDispaly = properties || ['species', 'name', 'gender', 'legs', 'friends', 'saying'];
      return propertiesForDispaly.map(property => `<b>${property}:</b> ${this[property]}`).join('\t');
   }
};

class Dog extends Mammal {
   constructor(name, gender, friends, saying) {
      super('dog', name, gender, 4, friends, saying || 'guf');
   }

   tellAbout() {
      let properties = ['name', 'species', 'friends']; /* properties for display */
      return super.tellAbout(properties);
   }
};

class Cat extends Mammal {
   constructor(name, gender, friends, saying) {
      super('cat', name, gender, 4, friends, saying || 'meow');
   }

   tellAbout() {
      let properties = ['species', 'name', 'gender', 'legs', 'friends', 'saying']; /* properties for display */
      return super.tellAbout(properties);
   }

   get getSaying() {
      return this.saying;
   }
}

class Human extends Mammal {
   constructor(name, gender, friends, saying) {
      super('human', name, gender, 2, friends, saying);
      this.hands = 2;
      this.saying = saying || `Hello! My name is ${this.name}`;
   }
   tellAbout() {
      let childProperties = arguments[0]; /* array of properties for display from child if it exists*/
      let properties = ['species', 'name', 'gender', 'legs', 'hands', 'friends', 'saying']; /* properties for display */
      return super.tellAbout(childProperties || properties);
   }
}

class Woman extends Human {
   constructor(name, friends, saying) {
      super(name, 'female', friends, saying);
   }
   tellAbout() {
      return super.tellAbout(); /* You can also add array of property to display them */
   }
}

class Man extends Human {
   constructor(name, friends, saying) {
      super(name, 'male', friends, saying);
   }
   tellAbout() {
      let properties = ['name', 'friends', 'saying'];
      return super.tellAbout(properties);
   }
}

class CatWoman extends Woman {
   constructor(name, friends) {
      super(name, friends, 'meow', Cat.prototype.getSaying);
   }
   tellAbout() {
      return super.tellAbout();
   }
}

const cat = new Cat('Murzic', 'male', ['Elza', 'Nicky']);
const dog = new Dog('Lucy', 'female', ['Alla', 'Dima'], 'guffyy');
const man = new Man('Vlad', ['Sergay', 'Anton'], 'Hello everyone!');
const woman = new Woman('Anna', ['Sergay', 'Artem']);
const catWoman = new CatWoman('Lily', ['Batman']);

const inhabitants = [cat, dog, man, woman, catWoman];

let output = inhabitants.map(inhabitant => inhabitant.tellAbout()).join('\n');

print(output);
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
