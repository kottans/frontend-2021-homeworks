/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/nadsatt/a-tiny-JS-world
   Web app: https://nadsatt.github.io/a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
   constructor({species, hands = 0, legs = 0, saying, gender, name, friends = []}){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.hands = hands;
      this.legs = legs;
      this.friends = friends;
   }

   toString(){
      return Object.entries(this).reduce((res, [key, value]) => {

         if(key === 'friends' && value.length === 0) res += `${key}: no friends; `
         else if (key === 'friends') res += `${key}: ${value.map(obj => obj.name).join(',')}; `
         else res += `${key}: ${value}; `

         return res;
      }, '');
   }
}

class Cat extends Inhabitant {
   constructor(gender, name, friends){
      super({species: 'cat', legs: 4, saying: 'meov-meov!', gender, name, friends});
   }
}

class Dog extends Inhabitant {
   constructor(gender, name, friends){
      super({species: 'dog', legs: 4, saying: 'woof-woof!', gender, name, friends});
   }
}

class Human extends Inhabitant {
   constructor({saying, name, gender, friends}){
      super({species: 'human', hands: 2, legs: 2, saying, gender, name, friends});
   }
}

class Man extends Human {
   constructor(name, friends){
      super({saying: 'i\'m a man!', gender: 'male', name, friends});
   }
}

class Woman extends Human {
   constructor(name, friends){
      super({saying: 'i\'m a woman!', gender: 'female', name, friends});
   }
}

class CatWoman extends Cat {
   constructor(name, friends){
      super('female', name, friends);
      this.species = 'human';
      this.hands = 2;
      this.legs = 2;
   }
}

const inhabitants = [
   new Cat('female', 'Kitty'),
   new Dog('male', 'Bob', [new Dog('female', 'Stella')]),
   new Man('Nick', [new Dog('male','Baxter'), new Cat('male', 'Simon')]),
   new Woman('Lucy'),
   new CatWoman('Kate', [new Man('Tom')])
];

// ======== OUTPUT ========
/* 
   Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
*/

inhabitants.forEach(inhabitant => print(inhabitant.toString(), 'div'));

function print(strObj, el = 'pre'){
   const main = document.querySelector('main');

   el = document.createElement(el);
   el.innerHTML = strObj;

   main.appendChild(el);
}
