/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

  // ======== OBJECTS DEFINITIONS ========
  class Inhabitant {
    constructor(species, name, age, gender, limbs, saying) {
      this.species = species;
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.limbs = limbs;
      this.saying = saying;
    }

    getName() {
      return this.name;
    }

    getLimbs() {
      return `I have ${this.limbs} limbs`
    }

    introduce() {
      return `I'm ${this.age} years old ${this.species}, ${this.gender}. ${this.getLimbs()}. "${this.saying}". `
    }
  }

  class Human extends Inhabitant {
    constructor(name, lastName, age, gender, saying) {
      super('human', name, age, gender, [2, 2], saying);
      this.lastName = lastName;
    }

    getName() {
      return `${super.getName()} ${this.lastName}`;
    }

    getLimbs() {
      return `I have ${this.limbs[0]} hands and ${this.limbs[1]} legs`
    }
  }

  class Woman extends Human {
    constructor(name, lastName, age, saying) {
      super(name, lastName, age, 'female', saying);
      this.lovedBy;
    }

    getOneLovedBy(lovedBy) {
      this.lovedBy = lovedBy;
    }

    beLoved() {
      return `I'm happy to be loved by ${this.lovedBy === this.getName() ? 'myself' : this.lovedBy}.`;
    }

    introduce() {
      return super.introduce()+this.beLoved();
    }
  }

  class Man extends Human {
    constructor(name, lastName, age, saying) {
      super(name, lastName, age, 'male', saying);
    }

    beGentleman() {
      return `Anyway I believe, every woman is beautiful!`;
    }

    introduce() {
      return super.introduce() + this.beGentleman();
    }
  }

  class Pet extends Inhabitant {
    constructor(species, name, age, gender, limbs, saying) {
      super(species, name, age, gender, limbs, saying);
    }

    getLimbs() {
      return `I have ${this.limbs} paws`
    }

    beTooMuchNice() {
      return ` ..sleeping softly on the knees. `;
    }

    introduce() {
      return super.introduce() + this.beTooMuchNice();
    }
  }

  class Cat extends Pet {
    constructor(name, age, gender) {
      super('cat', name, age, gender, 4, 'Meow!..');
    }
  }

  class Dog extends Pet {
    constructor(name, age, gender) {
      super('dog', name, age, gender, 4, 'woof-woof..');
    }
  }

  function add_prop_value(object1, object2, property) { object1[property] += ` & ${object2[property]}` };

  class CatWoman extends Woman {
    constructor(name, lastName, age, saying) {
      const halfCat = new Cat();
      super(name, lastName, age, halfCat.saying);
      add_prop_value(this, new Cat({}), 'species');
    }
  }

  class World {
    constructor(name) {
      this.name = name;
      this.inhabitants = [];
    }

    getNewInhabitants() {
      this.inhabitants.push(...arguments);
    }

    getRandomInhabitantName() {
      return this.inhabitants[Math.floor(Math.random() * (this.inhabitants.length))].getName();
    }

    overview() {
      print(`Welcome to my hidden universe ${this.name}!
  It's not empty. Here are its creatures.`);
      this.inhabitants.forEach(inhabitant => print(`${inhabitant.getName()}: ${inhabitant.introduce()}`));
    }
  }

  const alien = new Inhabitant('alien', 'Eva', 'one billion', 'agender', 12, 'You are not alone!');
  const alex = new Human('Alex', 'Flash', 18, 'agender', 'Let\'s be king to each other!');
  const johnny = new Man('Johnny', 'Depp', 57, 'Hate my ex!');
  const love = new Woman('Love', 'Beautiful', 26, 'Love each other!');
  const ratatouille = new Pet('rat', 'Ratatouille', 1.5, 'male', 4, 'Yammy!');
  const roxy = new Cat('Roxolana', 1, 'female');
  const easy = new Dog('Easy', 2, 'female');
  const catWoman = new CatWoman('Selina', 'Kyle', 21, 'I\'m cat!');

  const notEarth = new World('KindaEarth');
  notEarth.getNewInhabitants(alien, alex, johnny, love, ratatouille, roxy, easy, catWoman);
  love.getOneLovedBy(notEarth.getRandomInhabitantName());
  catWoman.getOneLovedBy(notEarth.getRandomInhabitantName());
  notEarth.overview();
