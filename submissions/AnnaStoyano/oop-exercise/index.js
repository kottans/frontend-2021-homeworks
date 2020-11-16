/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Mammals{
   constructor(option){
      this.species = 'mammals',
      this.name = option.name,
      this.gender = option.gender,
      this.legs = 4,
      this.hands = 0,
      this.saying = option.saying,
      this.friends = option.friends
   }
}

class Dog extends Mammals{
   constructor(option){
      super(option);
      this.species = 'dog',
      this.saying = option.saying || 'guf'
   }
};

class Cat extends Mammals{
   constructor(option){
      super(option);
      this.species = 'cat',
      this.saying = option.saying || 'meow'
   }

   getSaying(){
      return this.saying || 'meow';
   }
}

class Human extends Mammals{
   constructor(option){
      super(option);
      this.species = 'human'
      this.hands = 2;
      this.legs =2;
      this.saying = option.saying || `Hello! My name is ${this.name}`
   }
}

class Woman extends Human{
   constructor(option){
      super(option);
      this.gender = 'female'
   }
}

class Man extends Human{
   constructor(option){
      super(option);
      this.gender = 'male'
   }
}

class CatWoman extends Woman{
   constructor(option){
      super(option);
      this.saying = Cat.prototype.getSaying();
   }
}

const cat = new Cat({name:'Murzic',gender:'male',friends:['Elza','Nicky']})
const dog = new Dog({name:'Lucy',gender:'female',saying:'guffyy',friends:['Alla','Dima']});
const man = new Man({name:'Vlad',friends:['Sergay','Anton'],saying:'Hello everyone!'});
const woman = new Woman({name:'Anna',friends:['Sergay','Artem']});
const catWoman = new CatWoman({name:'Lily',friends:['Batman']})


const inhabitants = [man,woman,cat,dog,catWoman];

const properties = ['name','species','gender','legs','hands','saying','friends'];
let output = inhabitants.map(inhabitant=>
   properties.map(property=>`<b>${property}:</b> ${inhabitant[property]}`
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


