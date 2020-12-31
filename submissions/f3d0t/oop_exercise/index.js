/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/f3d0t/f3d0t/tree/main/a_tiny_js_world_post_oop
   Web app: https://f3d0t.github.io/f3d0t/a_tiny_js_world_post_oop/
   */

class Inhabitant {
	constructor(name, species, gender, legs, saying) {
		this.name = name;
		this.species = species;
		this.gender = gender;
		this.legs = legs;
		this.saying = saying;
	}

	toString() {
		const templateArray = [
			`HI! My name is ${this.name}.`, 
			`I belong to the specie of ${this.species}.`, 
			`My gender is ${this.gender}.`, 
			`Saying: "${this.saying}".`, 
			`I have ${this.legs} legs.`
		];
		return templateArray.join(" ");
	}
}

class Dog extends Inhabitant {
	constructor(name, gender) {
		super(name, "dog", gender, 4, "BaRk!!");
	}
}

class Cat extends Inhabitant {
	constructor(name, gender) {
		super(name, "cat", gender, 4, "Meooow!!");
	}
}

class Human extends Inhabitant {
	constructor(name, gender, saying) {
		super(name, "Human", gender, 2, saying);
		this.hands = 2;
	}

	toString() {
		return super.toString() + ` I have ${this.hands} hands.`;
	}
}

class CatHuman extends Cat {
	constructor(name, gender) {
		super(name, gender);
		this.hands = 2;
		this.legs = 2;
		this.species = "Cathuman";
	}

	toString() {
		return super.toString() + ` I have ${this.hands} hands.`;
	}
}

const dog = new Dog("Reks", "male");
const cat = new Cat("Tima", "male");
const woman = new Human("Mella", "female", "Okay honey");
const man = new Human("Andrew", "male", "I'm true Js master(joke)");
const catWoman = new CatHuman("Selina", "female");

const inhabitants = [dog, cat, man, woman, catWoman];

inhabitants.forEach((being) => {
	print(being);
});
