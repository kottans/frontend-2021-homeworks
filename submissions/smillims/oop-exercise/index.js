/* 
	Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

class Inhabitant {
	constructor(species, gender, name, legs){
		this.species = species;
		this.gender = gender;
		this.name = name;
		this.legs = legs;
	}
	properties(){
		return ['species', 'gender', 'name', 'legs'];
	}
	saying(){
		return [`Hi, I'm ` + this.species,
		`My name is ` + this.name,
		`My gender is ` + this.gender,
		`I have ` + this.legs + ` legs`, ``].join('. ');
	}
}

class Human extends Inhabitant {
	constructor(surname, name, gender, hands = 2) {
		super('human', gender, name, 2);
		this.surname = surname;
		this.hands = hands;
	}
}

class Man extends Human {
	constructor(name, surname) {
		super(surname, name, 'male')
	}
	itsSaying() {
		return super.saying() + [`I have ` + this.hands + ` hands`, 
										`My surname is ` + this.surname].join('. ');
	}
}

class Woman extends Human {
	constructor(name, surname) {
		super(surname, name, 'female')
	}
	itsSaying() {
		return super.saying() + [`I have ` + this.hands + ` hands`, 
										`My surname is ` + this.surname].join('. ');
	}
}

class Cat extends Inhabitant {
	constructor(surname, name, gender) {
		super('cat', gender, name, '4')
		this.surname = surname;
	}
}

class sheCat extends Cat {
	constructor(name, surname) {
		super(surname, name, 'female')
	}
	itsSaying() {
		return super.saying() + [`My surname is ` + this.surname].join('. ');
	}
}

class Dog extends Inhabitant {
	constructor(surname, name, gender) {
		super('dog', gender, name, '4')
		this.surname = surname;
	}
}

class sheDog extends Dog {
	constructor(name, surname){
		super(surname, name, 'female')
	}
	itsSaying() {
		return super.saying() + [`My surname is ` + this.surname].join('. ');
	}
}

const dog = new sheDog('Arrow', 'Space');
const cat = new sheCat('Murka', 'Murkovna');
const woman = new Woman('Enn', 'Hatuey');
const man = new Man('Jorj', 'Kluni');

const allInhabitants = [dog, cat, woman, man];

const printAll = function() {
	allInhabitants.map(item => print(item.itsSaying()));
};

printAll();
