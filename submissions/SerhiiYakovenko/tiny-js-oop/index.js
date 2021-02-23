class Inhabitant {
   constructor(species, name, gender, legs, saying) {
     this.species = species;
     this.name = name;
     this.gender = gender;
     this.legs = legs;
     this.saying = saying;
     this.friends = [];
   }
 
   addFriends(friends) {
     this.friends = [...friends];
   }
 
   createOutput() {
     return `
       Hello there :wave:  
       My name is ${this.name}
       My favourite quote: ${this.saying}
       My best friends: ${this.friends.map((friend) => friend.name).join(", ")}
       My species is ${this.species} and I'm ${this.gender} with ${this.legs} legs`;
   }
 }
 
 class Human extends Inhabitant {
   constructor(name, gender, saying) {
     super("human", name, gender, 2, saying);
     this.hands = 2;
   }
   createOutput() {
     return super.createOutput() + ` and ${this.hands} hands.`;
   }
 }
 
 class Man extends Human {
   constructor(name, saying) {
     super(name, "male", saying);
   }
 }
 
 class Woman extends Human {
   constructor(name, saying) {
     super(name, "female", saying);
   }
 }
 
 class Animal extends Inhabitant {
   constructor(species, name, gender, saying) {
     super(species, name, gender, 4, saying);
   }
 }
 
 class Cat extends Animal {
   constructor(name, gender, saying) {
     super("cat", name, gender, saying);
   }
 }
 
 class Dog extends Animal {
   constructor(name, gender, saying) {
     super("dog", name, gender, saying);
   }
 }
 
 const boi = new Man(
   "Dadia Fedor",
   "Я ничей. Я сам по себе мальчик. Свой собственный."
 );
 const mama = new Woman(
   "Rimma",
   "Это не техника дошла, а я сама сюда дошла, на лыжах!"
 );
 const papa = new Man("Dmitriy", "Здравствуйте! Угадайте, кто я?");
 const pes = new Dog(
   "Sharik",
   "male",
   "Попрошу внимания! Сделайте, пожалуйста, умные лица!"
 );
 const kot = new Cat(
   "Matroskin",
   "male",
   "Не правильно ты, дядя Фёдор, бутерброд ешь..."
 );
 
 boi.addFriends([mama, papa, kot, pes]);
 mama.addFriends([boi, papa]);
 papa.addFriends([boi, mama]);
 pes.addFriends([boi, kot]);
 kot.addFriends([boi, pes]);
 
 [boi, mama, papa, pes, kot].forEach((person) => print(person.createOutput()));
 