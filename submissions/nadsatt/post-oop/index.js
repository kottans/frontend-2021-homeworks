/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/nadsatt/a-tiny-JS-world
   Web app: https://nadsatt.github.io/a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========

/* WHAT WAS DONE to make my code SOLID:
   - FOR S: i created new methods 'addFriends' and 'getFriends' in Inhabitant class and moved it to separate class 'FriendsManager'
            i also wanted to move 'toString' method to separate class 'InhabitantConverter 
            but i'm not sure about both ideas because it makes my code strange a bit (especially when i need to create FriendsManager instance for each inhabitant)
   - FOR O: i changed 'toString' method in 'Inhabitant' to make it dependent on specific properties 
            to have ability to redefine this method in subclasses
            to show how this method can be simultaneously closed for modifications in superclass and open for modifications in subclasses
   - FOR L: as i see, there is no cases where subclass can't be used instead of its superclass
            for example, in 'addFriends' method of 'FriendsManager' class instance of any subclass can be used
   - FOR I: as i see, there is no unused/unrelevant superclass' methods/props in subclasses
   - FOR D: -
*/ 

class Inhabitant {
   constructor(species, saying, gender, name, friends = []){
      this.species = species;
      this.saying = saying;
      this.gender = gender;
      this.name = name;
      this.friends = friends;
   }

   toString(){
      return `species: ${this.species}, saying: ${this.saying}, gender: ${this.gender}, name: ${this.name}, friends: ${new FriendsManager(this).getFriends()}`;
   }
}

class FriendsManager {
   constructor(inhabitant){
      this.inhabitant = inhabitant;
   }

   addFriends(...friends){
      this.inhabitant.friends.push(...friends);
   }

   getFriends(){
      return this.inhabitant.friends.map(friend => friend.name).join(' ') || 'no friends';
   }
}

class Primate extends Inhabitant {
   constructor(species, saying, gender, name, ...friends){
      super(species, saying, gender, name, friends);
      this.hands = 2;
      this.legs = 2;
   }

   toString(){
      return super.toString() + `, legs: ${this.legs}, hands: ${this.hands}`;
   }
}

class Human extends Primate {
   constructor(saying, gender, name, ...friends){
      super('human', saying, gender, name, ...friends);
   }
}

class Man extends Human {
   constructor(name, ...friends){
      super('i\'m a man!', 'male', name, ...friends);
   }
}

class Woman extends Human {
   constructor(name, ...friends){
      super('i\'m a woman!', 'female', name, ...friends);
   }
}

class Predator extends Inhabitant {
   constructor(species, saying, gender, name, ...friends){
      super(species, saying, gender, name, friends);
      this.legs = 4;
   }

   toString(){
      return super.toString() + `, legs: ${this.legs}`;
   }
}

class Dog extends Predator {
   constructor(gender, name, ...friends){
      super('dog', 'woof-woof!', gender, name, ...friends);
   }
}

class Cat extends Predator {
   constructor(gender, name, ...friends){
      super('cat', 'meov-meov!', gender, name, ...friends);
   }
}

class CatWoman extends Cat {
   constructor(name, ...friends){
      super('female', name, ...friends);
      this.species = 'human';
      this.hands = 2;
      this.legs = 2;
   }

   toString(){
      return super.toString() + `, hands: ${this.hands}`;
   }
}

const cat1 = new Cat('female', 'Kitty');
const dog1 = new Dog('male', 'Bob', cat1);
const man1 = new Man('Nick');
const woman1 = new Woman('Lucy');
const woman2 = new Human('i\'m a special woman!', 'female', 'Linda');
const catWoman1 = new CatWoman('Kate', man1, woman2);

const cat1Friends = new FriendsManager(cat1);
cat1Friends.addFriends(dog1);

const man1Friends = new FriendsManager(man1);
man1Friends.addFriends(catWoman1);

const woman2Friends = new FriendsManager(woman2);
woman2Friends.addFriends(catWoman1);

const inhabitants = [
   man1, 
   woman1,
   catWoman1,
   cat1,
   dog1
];

// ======== OUTPUT ========
/* 
   Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
*/

inhabitants.forEach(inhabitant => print(inhabitant.toString()));
