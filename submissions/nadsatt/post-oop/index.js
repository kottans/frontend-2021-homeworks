/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/nadsatt/a-tiny-JS-world
   Web app: https://nadsatt.github.io/a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========

class FriendsManager {
   constructor(friends = []){
      this.friends = friends;
   }

   addFriends(...friends){
      this.friends.push(...friends);
   }

   getFriends(){
      return this.friends.map(friend => friend.name).join(' ') || 'no friends';
   }
}

class Inhabitant {
   constructor(species, saying, gender, name, friends){
      this.friendsManager = new FriendsManager(friends);
      this.species = species;
      this.saying = saying;
      this.gender = gender;
      this.name = name;
   }

   toString(){
      let props = ['species', 'saying', 'gender', 'name']
         .map(prop => `${prop}: ${this[prop]}`)
         .join(', ');
         
      return props + `, friends: ${this.friendsManager.getFriends()}`;
   }
}

class Primate extends Inhabitant {
   constructor(species, saying, gender, name, ...friends){
      super(species, saying, gender, name, friends);
      this.legs = 2;
      this.hands = 2;
   }

   toString(){
      return [
         super.toString(),
         ...['legs', 'hands'].map(prop => `${prop}: ${this[prop]}`)
      ].join(', ');
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
      return [
         super.toString(),
         `legs: ${this.legs}`
      ].join(', ');
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
      return [
         super.toString(), 
         `hands: ${this.hands}`
      ].join(', ');
   }
}

const cat1 = new Cat('female', 'Kitty');
const dog1 = new Dog('male', 'Bob', cat1);
const man1 = new Man('Nick'); 
const woman1 = new Woman('Lucy');
const woman2 = new Human('i\'m a special woman!', 'female', 'Linda');
const catWoman1 = new CatWoman('Kate', man1, woman2);

cat1.friendsManager.addFriends(dog1);
man1.friendsManager.addFriends(catWoman1);
woman2.friendsManager.addFriends(catWoman1);

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

inhabitants.forEach(inhabitant => print(inhabitant));
