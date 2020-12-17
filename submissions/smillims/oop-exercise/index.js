/* 
	Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

'use strict';

class Inhabitats {
	constructor (species, name, surname, gender, legs, hands, saying) {
		this.species = species;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.legs = legs;
		this.hands = hands;
		this.saying = saying;
	}
};

Inhabitats.prototype.toString = function() {
	return `${this.species}; ${this.name}; ${this.surname}; ${this.gender}; ${this.legs}; ${this.hands}; ${this.saying}`
};

class Cat extends Inhabitats {
	constructor (species, name, surname, gender, legs, hands, saying){
		super(species, name, surname, gender, legs, hands, saying);
	}
};

class Man extends Inhabitats {
	constructor (species, name, surname, gender, legs, hands, saying){
		super(species, name, surname, gender, legs, hands, saying);
	}
};

class Dog extends Inhabitats {
	constructor (species, name, surname, gender, legs, hands, saying){
		super(species, name, surname, gender, legs, hands, saying);
	}
};

class Woman extends Inhabitats {
	constructor (species, name, surname, gender, legs, hands, saying){
		super(species, name, surname, gender, legs, hands, saying);
	}
};

const cat = new Cat('cat', 'Murka', 'Murkovna', 'female', '4', '0', 'Hey, I\'m cat.');
const man = new Man('human', 'Jorj', 'Kluni', 'male', '2', '2', 'Did you see Ocean\'s Eleven?');
const dog = new Dog('dog', 'Arrow', 'Space', 'female', '4', '0', 'I were in space, what about you?');
const woman = new Woman('human', 'Enn', 'Hatuey', 'female', '2', '2', 'Follow me on instagram.');

const allInhabitats = [
	cat,
	man,
	dog,
	woman
];

const forInhabitats = () => {
	return allInhabitats.forEach(some => print(some));
}

forInhabitats();
