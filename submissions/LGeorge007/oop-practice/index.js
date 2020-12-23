class Inhabitant {
   constructor(name, gender, greeting, friends, species) {
       this.name = name;
       this.gender = gender;
       this.greeting = greeting;
       this.friends = friends;
       this.species = species;
   }

   say() {
       let haveFriend = (this.friends !== undefined)
         ? (this.friends.length === 1)
            ? "I have a friend. This is " + this.friends[0]
            : "I have friends. These are "+ this.friends.join(", ")
         : "I'm alone. I have no friends";
         return `${this.greeting} I'm ${this.name}. I'm a ${this.species} and I have a ${this.gender} gender. ${haveFriend}.`;
   }
}

class Animal extends Inhabitant {
   constructor(name, gender, greeting, friends, species) {
      super( name, gender, greeting, friends, species)
      this.paws = 4;
   }

   say() {
       return super.say() + ` I have ${this.paws} paws.`
   }
}

class Human extends Inhabitant {
   constructor(name, gender,  greeting, friends) {
      super(name, gender, greeting, friends, "human");
      this.legs = 2;
      this.hands = 2;
   }

   say() {
      return super.say() + ` I have ${this.legs} legs and ${this.hands} hands.`
   }
}

class Dog extends Animal {
   constructor(name, gender, greeting, friends) {
       super(name, gender, greeting, friends, "dog")
   }
}

class Cat extends Animal {
   constructor(name, gender, greeting, friends) {
       super(name, gender, greeting, friends, "cat");
   }
}

class CatWoman extends Human {
   constructor(name, gender, greeting, friends) {
       super(name, gender, greeting, friends);
       this.species = "humicat";
   }
}

let catVoice = "Meow-meow!";

const inhabitantsList = [ new Human("Boris", "male", "HI!", ["Vladimir", "Innokentiy", "Fedor"]),
                       new Human("Larisa", "female", "Hello!", ["Diana","Laura","Svetlana"]),
                       new Dog("Sharikk", "male", "Woof-woof!", ["Bublik"]),
                       new Cat("Murzik", "male",  catVoice, ["Sonya", "Garfild", "Carapka"]),
                       new CatWoman ("Selina Kyle", "female", catVoice, )
                     ];

inhabitantsList.forEach(unit => print(unit.say()));
