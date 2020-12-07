/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/BlueLamantine/a-tiny-JS-world
   Web app: https://bluelamantine.github.io//a-tiny-JS-world/
   */
  class General {
   constructor({ name, gender, friends }) {
     this.name = name;
     this.gender = gender;
     this.friends = Array.isArray(friends) ? friends : 'no friends';
   }
 }
 
 class Human extends General {
   constructor({ name, gender, friends, voise }) {
     super({ name, gender, friends });
     this.voise = voise;
     this.species = 'human';
     this.legs = 2;
     this.hands = 2;
   }
 
   getGender() {
     return {
       male: ['He', 'his'],
       female: ['She', 'her'],
     };
   }
 
   getInfo() {
     return (
       `This ${this.species} is a ${this.gender}, ` +
       `${this.getGender()[this.gender][1]} name is ${this.name}. ` +
       `${this.getGender()[this.gender][0]} has ${this.legs} legs and ${
         this.hands
       } hands. ` +
       `${this.getGender()[this.gender][0]} says \'${
         this.voise
       }\'. Friend with : ${this.friends}`
     );
   }
 }
 
 class Man extends Human {
   constructor({ name, friends }) {
     super({ name, gender: 'male', friends, voise: 'What a wonderful world!' });
   }
 }
 
 class Woman extends Human {
   constructor({ name, friends }) {
     super({
       name,
       gender: 'female',
       friends,
       voise: 'Feminism is in the air!',
     });
   }
 }
 
 class Pet extends General {
   constructor({ name, gender, friends, species }) {
     super({ name, gender, friends });
     this.species = species;
     this.paws = 4;
   }
 
   getInfo() {
     return (
       `This ${this.species} is a ${this.gender}, its name is ${this.name}. ` +
       `The ${this.species} has ${this.paws} paws. Makes a sound \'${this.sound}\'. ` +
       `Social with : ${this.friends}`
     );
   }
 }
 
 class Cat extends Pet {
   constructor({ name, gender, friends }) {
     super({ name, gender, friends, species: 'cat' });
     this.sound = 'Meow Purrrr Purrr';
   }
 }
 
 class Dog extends Pet {
   constructor({ name, gender, friends }) {
     super({ name, gender, friends, species: 'dog' });
     this.sound = 'Woof woof';
   }
 }
 
 class CatWoman extends Woman {
   constructor({ name, friends }) {
     super({ name, friends });
     Object.assign(
       this,
       new Cat({
         name: 'Mary',
         gender: 'female',
         friends: this.friends,
       })
     );
     this.species = 'cat-woman';
     this.voise = this.sound;
   }
 }
 
 const woman = new Woman({ name: 'Eva', friends: ['Garfield', 'Jack'] });
 
 const cat = new Cat({ name: 'Garfield', gender: 'male' });
 
 const catWoman = new CatWoman({ name: 'Mary', friends: ['Eva', 'Garfield'] });
 
 const dog = new Dog({
   name: 'Hachiko',
   gender: 'male',
   friends: ['Eva', 'Jack'],
 });
 
 const man = new Man({ name: 'Jack', friends: ['Hachiko', 'Eva'] });
 
 [man, woman, cat, dog, catWoman].map(el => print(el.getInfo(), 'p'));

 