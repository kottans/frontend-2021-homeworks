/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/ik-web/a-tiny-JS-world
   Web app: https://ik-web.github.io/a-tiny-JS-world/

*/

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
   constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
   }

   toPrint() {
      return `A ${this.species} (<i>${this.gender}<i>) named <strong>${this.name}</strong> has ${this.legs} legs likes to say <u>${this.saying}</u>`;
   }
}

class Dog extends Inhabitant {
   constructor(name, gender) {
      super('dog', name, gender, 4, 'woof-woof');
   }
}

class Cat extends Inhabitant {
   constructor(name, gender) {
      super('cat', name, gender, 4, 'meow');
   }

   getSaying() {
      return this.saying;
   }
}

class Human extends Inhabitant {
   constructor(name, gender, hands, saying) {
      super('human', name, gender, 2, saying);
      this.hands = hands;
   }

   toPrint() {
      const strToArr = super.toPrint().split('legs');
      return `${strToArr[0]} legs and ${this.hands} hands${strToArr[1]}`;
   }
}

class CatWoman extends Human {
   constructor(name, saying) {
      super(name, 'female', 2, saying);
      this.species = 'mystery of nature';
   }
}

const dog = new Dog('Bobik', 'male');
const cat = new Cat('Barsik', 'male');
const man = new Human('Benjamin', 'male', 2, 'Hi to all!');
const woman = new Human('Sarah', 'female', 2, 'Hello everyone!');
const catWoman = new CatWoman('anonymos', cat.getSaying());
const tinyJsWorldPopulation = [dog, cat, man, woman, catWoman];

tinyJsWorldPopulation.forEach(function(obj) {
   print(obj.toPrint());
});
