/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

  // ======== OBJECTS DEFINITIONS ========
  class Inhabitant {
    constructor(name, age, species) {
      this.name = name;
      this.age = age;
      this.species = species;
    }

    getName() {
      return this.name;
    }

    introduce() {
      return `I'm ${this.age} years old ${this.species}.`
    }
  }

  class Human extends Inhabitant {
    constructor(name, lastName, age, gender, saying) {
      super(name, age, 'human');
      this.gender = gender;
      this.lastName = lastName;
      this.saying = saying;
    }

    getName() {
      return `${super.getName()} ${this.lastName}`;
    }

    introduce() {
      return `${super.introduce()} I feel I'm ${this.gender}. My message is "${this.saying}" `;
    }
  }

  class Woman extends Human {
    constructor(name, lastName, age, saying) {
      super(name, lastName, age, 'woman', saying);
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
      super(name, lastName, age, 'man', saying);
    }

    beGentleman() {
      return `Anyway I believe, every woman is beautiful!`;
    }

    introduce() {
      return super.introduce() + this.beGentleman();
    }
  }

  class Pet extends Inhabitant {
    constructor(name, age, species, sex) {
      super(name, age, species);
      this.sex = sex;
    }

    beTooMuchNice() {
      return ` ..sleeping softly on the knees. `;
    }

    introduce() {
      return super.introduce() + this.beTooMuchNice();
    }
  }

  class Cat extends Pet {
    constructor(name, age, sex) {
      super(name, age, 'cat', sex);
    }

    sayMeow() {
      return `meow!..`
    }

    introduce() {
      return super.introduce() + this.sayMeow();
    }
  }

  class Dog extends Pet {
    constructor(name, age, sex) {
      super(name, age, 'dog', sex);
    }

    defendMyLord() {
      return `Go away, strangers! woof-woof..`
    }

    introduce() {
      return super.introduce() + this.defendMyLord();
    }
  }

  function add_prop_value(object1, object2, property) { object1[property] += ` & ${object2[property]}` };

  class CatWoman extends Woman {
    constructor(name, lastName, age, saying) {
      const halfCat = new Cat();
      super(name, lastName, age, halfCat.sayMeow());
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

  const alien = new Inhabitant('Eva', 'one billion', 'alien');
  const alex = new Human('Alex', 'Flash', 18, 'agender', 'Let\'s be king to each other!')
  const johnny = new Man('Johnny', 'Depp', 57, 'Hate my ex!');
  const love = new Woman('Love', 'Beautiful', 26, 'Love each other!');
  const ratatouille = new Pet('Ratatouille', 1.5, 'rat', 'male');
  const roxy = new Cat('Roxolana', 1, 'female');
  const easy = new Dog('Easy', 2, 'female');
  const catWoman = new CatWoman('Selina', 'Kyle', 21, 'I\'m cat!');

  const notEarth = new World('KindaEarth');
  notEarth.getNewInhabitants(alien, alex, johnny, love, ratatouille, roxy, easy, catWoman);
  love.getOneLovedBy(notEarth.getRandomInhabitantName());
  catWoman.getOneLovedBy(notEarth.getRandomInhabitantName());
  notEarth.overview();
