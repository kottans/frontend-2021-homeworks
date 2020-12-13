class Inhabitant {
   constructor({ species, name, say, gender }) {
      this.species = species;
      this.name = name;
      this.say = say;
      this.gender = gender;
      this.friends = new Set();
   }

   makeFriends(...applicants) {
      applicants.filter(applicant => applicant instanceof Inhabitant && applicant != this)
         .forEach(applicant => this.friends.add(applicant));
   }

   toString() {
      const { name, species, friends, gender } = this;
      return (
         `Data: ${species}, ${gender}, ${name}, ${friends.size || 'no'} friend` +
         `${friends.size == 1 ? '' : 's'}`
      )
   }
}

class Animal extends Inhabitant {
   constructor({ species, name, gender, say, paws = 4 }) {
      super({ species, name, say, gender });
      this.paws = paws;
   }

   toString() {
      return `<b>${this.say}</b> \n${super.toString()}, ${this.paws} paws.`
   }
}

class Dog extends Animal {
   constructor({ name, gender, paws }) {
      super({ species: 'dog', name, gender, say: 'WOOF-WOOF!!!', paws });
   }
}

class Cat extends Animal {
   constructor({ name, gender, paws }) {
      super({ species: 'cat', name, gender, say: 'Meow...', paws });
      this.friends.add(this);
   }

   bite(victim) {
      victim.species += this.species;
      victim.say = this.say;
   }
}

class Human extends Inhabitant {
   constructor({ species = "human", name, say, gender, hands = 2, legs = 2 }) {
      super({ species, name, say, gender });
      this.legs = legs;
      this.hands = hands;
   }

   getFriendsNamesList() {
      if (this.friends.size) {
         return (
            `I\'m friends with ${[...this.friends].map(friend => friend.name).join(', ')}`
         );
      } else {
         return 'I don\'t need friends';
      }
   }

   toString() {
      return (
         `<b>${this.say}</b>\n` +
         `${super.toString()}, ${this.gender}, ${this.hands} hands and ${this.legs} legs.\n` +
         `<b>${this.getFriendsNamesList()}.</b >`
      )
   }
}

const cat = new Cat({ name: 'Murka', gender: 'female' });
const dog = new Dog({ name: 'Gektor', gender: 'male' });
const man = new Human({ name: 'John Silver', gender: 'male', legs: 1, say: 'Aloha!' });
const woman = new Human({ name: 'Eva', gender: 'female', say: 'Hello.' });
const catWoman = new Human({ name: 'Akrum', gender: 'female', say: 'Hi!' });

const inhabitants = [cat, dog, man, woman, catWoman];

cat.bite(catWoman);

inhabitants.forEach((item) => {
   dog.makeFriends(item);
   woman.makeFriends(item);
});
catWoman.makeFriends(woman, cat);

inhabitants.forEach((item) => print(item));
