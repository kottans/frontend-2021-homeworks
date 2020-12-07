/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      this.species;
    }

    introduce() {
      return `I\'ve existed for ${this.age} years`
    }
  }

  class Human extends Inhabitant {
    constructor(options) {
      super(options.name, options.age);
      this.name = `${options.name} ${options.lastName}`;
      this.species = 'human';
      this.saying = options.saying;
    }

    introduce() {
      return `${super.introduce()} as a ${this.species}. What I can say, \"${this.saying}\"`;
    }
  }

  class Woman extends Human {
    constructor(options) {
      super(options);
      this.gender = 'female';
      this.lovedBy;
    }

    beLoved() {
      return `\"I\'m loved by ${this.lovedBy == this.name ? 'myself' : this.lovedBy}.\"`;
    }

    introduce() {
      return `${super.introduce()} I\'m ${this.gender}. ${this.beLoved()}`;
    }
  }

  class Man extends Human {
    constructor(options) {
      super(options);
      this.gender = 'male';
    }

    beGentleman() {
      return `\"Every woman is beautiful!\"`;
    }

    introduce() {
      return `${super.introduce()}, but I\'m ${this.gender}, so ${this.beGentleman()}`;
    }
  }

  class Pet extends Inhabitant {
    constructor(options) {
      super(options.name, options.age);
    }

    beTooMuchNice() {
      return `...sleeping softly on the knees.`;
    }
  }

  class Cat extends Pet {
    constructor(options) {
      super(options);
      this.saying = 'meow!';
      this.species = 'cat';
    }

    introduce() {
      return `${super.introduce()}. I'm just ${this.species}. So, ${this.saying} ${super.beTooMuchNice()}`
    }
  }

  class Dog extends Pet {
    constructor(options) {
      super(options);
      this.saying = 'woof-woof!';
      this.species = 'dog';
    }

    introduce() {
      return `${super.introduce()} as a ${this.species}. I\'m cute, ${this.saying} ${super.beTooMuchNice()}`
    }
  }

  function replace_with(o, S, prop) { o[prop] = S[prop] };
  function add_prop_value(o, S, prop) { o[prop] += ` & ${S[prop]}` };

  class CatWoman extends Woman {
    constructor(options) {
      super(options);
      replace_with(this, new Cat({}), 'saying');
      add_prop_value(this, new Cat({}), 'species');
    }
  }

  class World {
    constructor(name) {
      this.name = name;
      this.inhabitants = [];
    }

    gotNewInhabitants() {
      this.inhabitants.push(...arguments);
    }

    randomInhabitant() {
      return this.inhabitants[Math.floor(Math.random() * (this.inhabitants.length))].name;
    }

    worldOverview() {
      print(`Welcome to my hidden universe ${this.name} ! \nIt\'s not empty. Here are its creatures.`);
      this.inhabitants.forEach(inhabitant => print(`Hey you, ${inhabitant.name}, your turn: ${inhabitant.introduce()}`));
    }
  }

  const johnny = new Man({ name: 'Johnny', lastName: 'Depp', age: 57, saying: 'Hate my ex!' });
  const love = new Woman({ name: 'Love', lastName: 'Beautiful', age: 26, saying: 'Love everyone!' });
  const roxy = new Cat({ name: 'Roxolana', age: 1});
  const easy = new Dog({ name: 'Easy', age: 2 });
  const catWoman = new CatWoman({ name: 'Selina', lastName: 'Kyle', age: 21, saying: 'I\'m cat!' });

  const notEarth = new World('KindaEarth');
  notEarth.gotNewInhabitants(johnny, love, roxy, easy, catWoman);
  love.lovedBy = notEarth.randomInhabitant();
  catWoman.lovedBy = notEarth.randomInhabitant();
  notEarth.worldOverview();
