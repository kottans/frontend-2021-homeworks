/* 
	Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

class Inhabitats {
	constructor(gender, legs, hands){
		this.gender = 'female';
		this.legs = '4';
		this.hands = '0';
	}
	toString(){
		const properties = ['species', 'name', 'surname', 'gender', 'legs', 'hands', 'saying'];
		const arrowProperties = properties.map(key => this[key]).join(', ');
		return arrowProperties;
	};
	saying(){
		let string = `Hi, I\'m ` + this.species + `. My name is ` + this.name + `. My surname is ` + this.surname + `. I\'m ` + this.gender + `. I have ` + this.legs + ` legs and ` + this.hands + ` hands.`;

		const arrowString = string.split();
		const checkString = arrowString.map(item => item).filter(value => value).join('; ');

		return checkString;
	};
};

class Human extends Inhabitats{
	constructor(species, legs, hands){
		super(species, legs, hands);
		this.species = 'human';
		this.legs = '2';
		this.hands = '2';
	};
};

class Cat extends Inhabitats {
	constructor (species, name, surname){
		super(species, name, surname);
		this.species = 'cat';
		this.name = 'Murka';
		this.surname = 'Murkovna';
	};
	itsSaying(){
		return super.saying();
	};
};

class Man extends Human {
	constructor (name, surname, gender){
		super(name, surname, gender);
		this.name = 'Jorj';
		this.surname = 'Kluni';
		this.gender = 'male';
	};
	itsSaying(){
		return super.saying();
	};
}

class Dog extends Inhabitats {
	constructor(species, name, surname){
		super(species, name, surname);
		this.species = 'dog';
		this.name = 'Arrow';
		this.surname = 'Space';
	};
	itsSaying(){
		return super.saying();
	};
};

class Woman extends Human {
	constructor(name, surname, gender){
		super(name, surname, gender);
		this.name = 'Enn';
		this.surname = 'Hatuey';
		this.gender = 'female';
	};
	itsSaying(){
		return super.saying();
	};
};

const cat = new Cat();
const man = new Man();
const dog = new Dog();
const woman = new Woman();

const allInhabitats = [cat, man, dog, woman];

const printAll = function() {
	allInhabitats.map(item => print(item.itsSaying()));
}

printAll();
