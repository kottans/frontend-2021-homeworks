class Inhabitant {
   constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.legs = legs;
      this.friends = [];
   }

   makeFriends(...friends) {
      this.friends = [...friends];
   }

   getFriendsList(friends) {
      return friends.length > 0 ? friends.map(friend => friend.name).join(', ') : 'no friends';
   }

   introduce() {
      return [this.species, this.name, this.gender, this.legs, this.saying, this.getFriendsList(this.friends)].join('; ');
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying) {
      super('human', name, gender, 2, saying);
      this.hands = 2;
   }

   introduce() {
      return [this.species, this.name, this.gender, this.legs, this.hands, this.saying, this.getFriendsList(this.friends)].join('; ');
   }
}

class Dog extends Inhabitant {
   constructor(name, gender) {
      super('dog', name, gender, 4, 'Woof-woof');
   }
}

class Cat extends Inhabitant {
   constructor(name, gender) {
      super('cat', name, gender, 4, 'Meow');
   }
}

const man = new Human('Charles', 'male', 'What up');
const woman = new Human('Raven', 'female', 'Hey!');
const dog = new Dog('Luna', 'female');
const cat = new Cat('Vincent', 'male');

man.makeFriends(woman);
woman.makeFriends(man);
dog.makeFriends(man, woman);

[man, woman, dog, cat].forEach(inhabitant => print(inhabitant.introduce()));
