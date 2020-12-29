function Inhabitant(species, name, gender, legs, hands, saying) {
   this.species = species;
   this.name = name;
   this.gender = gender;
   this.legs = legs;
   this.hands = hands;
   this.saying = saying;
};

Inhabitant.prototype.addFriends = function (...friends) {
   this.friends = friends;
}

Inhabitant.prototype.createOutput = function () {
   return `Hello there :wave: My species is ${this.species}, my name is ${this.name} and I'm ${this.gender} with ${this.legs} legs and ${this.hands} hands. 
      My favourite quote: ${this.saying} for my Best friends: ${this.friends[0].map(friend => friend.name).join(', ')}`;
}

const boi = new Inhabitant('human', 'Dadia Fedor', 'male', 2, 2, 'Я ничей. Я сам по себе мальчик. Свой собственный.');
const mama = new Inhabitant('human', 'Rimma', 'female', 2, 2, 'Это не техника дошла, а я сама сюда дошла, на лыжах!');
const papa = new Inhabitant('human', 'Dmitriy', 'male', 2, 2, 'Здравствуйте! Угадайте, кто я?');
const pes = new Inhabitant('dog', 'Sharik', 'male', 4, 0, 'Попрошу внимания! Сделайте, пожалуйста, умные лица!');
const kot = new Inhabitant('cat', 'Matroskin', 'male', 4, 0, 'Не правильно ты, дядя Фёдор, бутерброд ешь...');

boi.addFriends([mama, papa, kot, pes]);
mama.addFriends([boi, papa]);
papa.addFriends([boi, mama]);
pes.addFriends([boi, kot]);
kot.addFriends([boi, pes]);

[boi, mama, papa, pes, kot].forEach(person => print(person.createOutput()));
