/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Mammals{
   constructor(name,gender,friends){
      this.species = 'mammals',
      this.name = name,
      this.gender = gender,
      this.legs = 4,
      this.friends = friends
   }
}

class Dog extends Mammals{
   constructor(name,gender,friends,saying){
      super(name,gender,friends);
      this.species = 'dog',
      this.saying = saying || 'guf'
   }
};

class Cat extends Mammals{
   constructor(name,gender,friends,saying){
      super(name,gender,saying,friends);
      this.species = 'cat',
      this.saying = saying || 'guf'
   }

   getSaying(){
      return this.saying || 'meow';
   }
}

class Human extends Mammals{
   constructor(name,gender,friends,saying){
      super(name,gender,friends);
      this.species = 'human'
      this.hands = 2;
      this.legs =2;
      this.saying = saying || `Hello! My name is ${this.name}`
   }
}

class Woman extends Human{
   constructor(name,friends,saying){
      super(name,friends,saying);
      this.gender = 'female'
   }
}

class Man extends Human{
   constructor(name,friends,saying){
      super(name,friends,saying);
      this.gender = 'male'
   }
}

class CatWoman extends Woman{
   constructor(name,friends,saying){
      super(name,friends,saying);
      this.saying = Cat.prototype.getSaying();
   }
}

const cat = new Cat(name='Murzic',gender='male',friends=['Elza','Nicky'])
const dog = new Dog(name='Lucy',gender='female',saying='guffyy',friends=['Alla','Dima']);
const man = new Man(name='Vlad',friends=['Sergay','Anton'],saying='Hello everyone!');
const woman = new Woman(name='Anna',friends=['Sergay','Artem']);
const catWoman = new CatWoman(name='Lily',friends=['Batman'])

const inhabitants = [man,woman,cat,dog,catWoman];

const properties = ['name','species','gender','legs','hands','saying','friends'];
let output = inhabitants.map(inhabitant=>
   properties.map(property=>{
      if(inhabitant.hasOwnProperty(property))
         return `<b>${property}:</b> ${inhabitant[property]}`
      else
         return `<b>${property}:</b> ${inhabitant['species']} doesn't have`
      
   }
   ).join('\t')
).join('\n');

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


