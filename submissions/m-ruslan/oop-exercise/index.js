/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/m-ruslan/a-tiny-JS-world
   Web app: https://m-ruslan.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

//**ES6 classes and sub-classes
class Inhabitant {
  constructor(name, legs, gender, propNamesArr) {
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.friendTo = [];
    this.propNamesArr = propNamesArr;
  }

  addFriends(friendsArr) {
    this.friendTo = this.friendTo.concat(
      friendsArr.map((inhhabitant) => inhhabitant.name)
    );
  }

  makeMessage() {
    return this.propNamesArr
      .map((propName) =>
        typeof this[propName] === "function"
          ? `${propName}: ${this[propName]()}`
          : `${propName}: ${this[propName]}`
      )
      .join(";\n");
  }
}

class Human extends Inhabitant {
  constructor(name, legs, hands, gender) {
    const propNamesArr = [
      "species",
      "name",
      "saying",
      "gender",
      "legs",
      "hands",
      "friendTo",
    ];
    super(name, legs, gender, propNamesArr);
    this.hands = hands;
    this.species = "human";
  }
}

class Man extends Human {
  constructor(name, legs, hands, gender = "male") {
    super(name, legs, hands, gender);
  }

  saying() {
    return `Hi, I'm ${this.name}`;
  }
}

class Woman extends Human {
  constructor(name, legs, hands, gender = "female") {
    super(name, legs, hands, gender);
  }

  saying() {
    return `Hello, I'm ${this.name}`;
  }
}

class Pet extends Inhabitant {
  constructor(name, legs, gender) {
    const propNamesArr = [
      "species",
      "name",
      "saying",
      "gender",
      "legs",
      "friendTo",
    ];
    super(name, legs, gender, propNamesArr);
  }
}

class Dog extends Pet {
  constructor(name, legs, gender) {
    super(name, legs, gender);
    this.species = "dog";
  }

  saying() {
    return `Woof, I'm ${this.name}`;
  }
}

//**classes built employing composition
const sayingMoew = (state) => ({
  saying: () => `Meow, I'm ${state.name}`,
});

const addFriends = (state) => ({
  addFriends: (friendsArr) =>
    (state.friendTo = state.friendTo.concat(
      friendsArr.map((inhhabitant) => inhhabitant.name)
    )),
});

const makeMessage = (state) => ({
  makeMessage: () =>
    state.propNamesArr
      .map((propName) =>
        typeof state[propName] === "function"
          ? `${propName}: ${state[propName]()}`
          : `${propName}: ${state[propName]}`
      )
      .join(";\n"),
});

const Cat = (name, legs, gender) => {
  let state = {
    name,
    friendTo: [],
    gender,
    species: "cat",
    legs,
    propNamesArr: ["species", "name", "saying", "gender", "legs", "friendTo"],
  };
  return Object.assign(
    state,
    sayingMoew(state),
    addFriends(state),
    makeMessage(state)
  );
};

const CatWoman = (name, legs, hands, gender = "female") => {
  let state = {
    name,
    friendTo: [],
    gender,
    species: "catwoman",
    legs,
    hands,
    propNamesArr: [
      "species",
      "name",
      "saying",
      "gender",
      "legs",
      "hands",
      "friendTo",
    ],
  };
  return Object.assign(
    state,
    sayingMoew(state),
    addFriends(state),
    makeMessage(state)
  );
};

//**objects creation based on classes
const dog = new Dog("Ghost", 4, "male");
const woman = new Woman("Monica", 2, 2);
const man = new Man("Chandler", 2, 2);

const cat = Cat("Tom", 4, "male");
const catWoman = CatWoman("Cat-woman", 2, 2);

const friendList = [
  { target: dog, friends: [man, woman] },
  { target: man, friends: [woman, cat] },
  { target: woman, friends: [dog, man, cat] },
  { target: cat, friends: [dog, man, woman] },
  { target: catWoman, friends: [man, cat] },
].forEach(({ target, friends }) => target.addFriends(friends));

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

const world = [dog, cat, woman, man, catWoman];
world.forEach((inhabitant) => print(inhabitant.makeMessage()));
