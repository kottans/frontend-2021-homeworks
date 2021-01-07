/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: https://github.com/AsyaYeromina/a-tiny-JS-world
  Web app: https://asyayeromina.github.io/a-tiny-JS-world/.
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(inhabitantProperties) {
    this.species = inhabitantProperties.species;
    this.name = inhabitantProperties.name;
    this.gender = inhabitantProperties.gender;
    this.legs = inhabitantProperties.legs;
    this.speech = inhabitantProperties.speech;
    this.friends = inhabitantProperties.friends;
  }

  toString() {
    return [
      "speech",
      "name",
      "friends",
      "species",
      "gender",
      "legs",
    ]
      .map((propertyName) =>
        Array.isArray(this[propertyName])
        ? `${propertyName}: ${this[propertyName].join(", ")}`
        : `${propertyName}: ${this[propertyName]}`
      )
      .join("; ");
  }
}

class Animal extends Inhabitant {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, legs: 4});
    this.hasTail = inhabitantProperties.hasTail;
  }

  toString() {
    return [ super.toString(),
      this.hasTail ? "has tail" : "no tail",]
      .join("; ");
    }
}

class Canis extends Animal {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, species: "Canis", speech: "Woof-woof!", hasTail: true });
  }
}

class FelisCatus extends Animal {
  static catSpeech = "Meow";

  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, species: "Felis catus", speech: FelisCatus.catSpeech, hasTail: true });
  }
}

class Sapiens extends Inhabitant {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, legs: 2});
    this.hands = 2;
  }

  toString() {
    return [ super.toString(),
      `hands: ${this.hands}`,
    ].join("; ");
  }
}

class HomoSapiens extends Sapiens {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, species: "Homo sapiens" });
  }
}

class FelisSapiens extends Sapiens {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, species: "Felis sapiens" });
  }
}

class Woman extends HomoSapiens {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, gender: "female" });
  }
}

class Man extends HomoSapiens {
  constructor(inhabitantProperties) {
    super({ ...inhabitantProperties, gender: "male" });
  }
}

const dog = new Canis({
  name: "Jessie",
  gender: "female",
  friends: ["Stepan", "Ivanka"],
});

const cat = new FelisCatus({
  name: "Python",
  gender: "male",
  friends: [],
});

const woman = new Woman({
  name: "Ivanka",
  speech: "Hi!",
  friends: ["Stepan", "Python", "Jessie"],
});

const man = new Man({
  name: "Stepan",
  speech: "Hello!",
  friends: ["Ivanka", "Python", "Jessie"],
});

const catWoman = new FelisSapiens({
  name: "Selina",
  gender: "female",
  speech: FelisCatus.catSpeech,
  friends: ["Stepan", "Python"],
});

const inhabitantObjects = [dog, cat, woman, man, catWoman];

inhabitantObjects.map((inhabitant) => {
  print(inhabitant, "h3");
});

// ======== OUTPUT ========
/* Use print(message) for output.
  Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

  Message can contain HTML markup. You may also tweak index.html and/or styles.css.
  However, please, REFRAIN from improving visuals at least until your code is reviewed
  so code reviewers might focus on a single file that is index.js.
  */

/* Print examples:
  print('ABC');
  print('<strong>ABC</strong>');
  print('<strong>ABC</strong>', 'div');

  print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
  */
