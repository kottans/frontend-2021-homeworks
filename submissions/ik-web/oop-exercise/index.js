/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/ik-web/a-tiny-JS-world
   Web app: https://ik-web.github.io/a-tiny-JS-world/

*/

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
    constructor(species, name, gender, legs, hands, saying) {
       this.species = species;
       this.name = name;
       this.gender = gender;
       this.legs = legs;
       this.hands = hands;
       this.saying = saying;
    }
 }
 
 class Dog extends Inhabitant {
    constructor(name, gender) {
       super('dog', name, gender, 4, 0, 'woof-woof');
    }
 }
 
 class Cat extends Inhabitant {
    constructor(name, gender) {
       super('cat', name, gender, 4, 0, 'meow');
    }
 
    getSaying() {
       return this.saying;
    }
 }
 
 class Human extends Inhabitant {
    constructor(name, gender, saying) {
       super('human', name, gender, 2, 2, saying);
    }
 }
 
 class CatWoman extends Inhabitant {
    constructor(name, saying) {
       super('mystery of nature', name, 'female', 2, 2, saying);
    }
 }
 
 const dog = new Dog('Bobik', 'male');
 const cat = new Cat('Barsik', 'male');
 const man = new Human('Benjamin', 'male', 'Hi to all!');
 const woman = new Human('Sarah', 'female', 'Hello everyone!');
 const catWoman = new CatWoman('anonymos', cat.getSaying());
 const tinyJsWorldPopulation = [dog, cat, man, woman, catWoman];
 
 function toPrint(arr) {
    arr.forEach( function(obj) {
       print(`A ${obj.species} (<i>${obj.gender}<i>) named <strong>${obj.name}</strong> has ${obj.legs} legs and ${obj.hands} hands, likes to say <u>${obj.saying}</u>`);
    });
 }
 
 toPrint(tinyJsWorldPopulation);
 