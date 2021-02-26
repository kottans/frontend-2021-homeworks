/* 
  Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

class Inhabitant {
  constructor(surname, species, gender, name, legs){
    this.surname = surname;
    this.species = species;
    this.gender = gender;
    this.name = name;
    this.legs = legs;
  }
  toString(){
    return [`Hi, I'm ` + this.species,
    `My name is ` + this.name,
    `My gender is ` + this.gender,
    `I have ` + this.legs + ` legs`, ``].join(', ')
  }
}

class Human extends Inhabitant {
  constructor(surname, name, gender, hands = 2) {
    super(surname, 'human', gender, name, 2);
    this.hands = hands;
  }
}

class Man extends Human {
  constructor(name, surname) {
    super(surname, name, 'male')
  }
  toString() {
    return super.toString() + [`I have ` + this.hands + ` hands`, 
                            ` My surname is ` + this.surname]
  }
}

class Woman extends Human {
  constructor(name, surname) {
    super(surname, name, 'female')
  }
  toString() {
    return super.toString() + [`I have ` + this.hands + ` hands`, 
                            ` My surname is ` + this.surname]
  }
}

class Cat extends Inhabitant {
  constructor(surname, name, gender) {
    super(surname, 'cat', gender, name, '4')
  }
}

class SheCat extends Cat {
  constructor(name, surname) {
    super(surname, name, 'female')
  }
  toString() {
    return super.toString() + [`My surname is ` + this.surname]
  }
}

class Dog extends Inhabitant {
  constructor(surname, name, gender) {
    super(surname, 'dog', gender, name, '4')
  }
}

class SheDog extends Dog {
  constructor(name, surname){
    super(surname, name, 'female')
  }
  toString() {
    return super.toString() + [`My surname is ` + this.surname]
  }
}

const dog = new SheDog('Arrow', 'Space');
const cat = new SheCat('Murka', 'Murkovna');
const woman = new Woman('Enn', 'Hatuey');
const man = new Man('Jorj', 'Kluni');

const allInhabitants = [dog, cat, woman, man];
allInhabitants.forEach(inhabitant => print(inhabitant));
