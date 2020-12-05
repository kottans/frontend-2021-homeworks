/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/m-ruslan/a-tiny-JS-world
   Web app: https://m-ruslan.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

let Inhabitant = function (name, gender, saying, friendTo) {
  this.name = name;
  this.gender = gender;
  this.saying = saying;
  this.friendTo = friendTo;
};

let Human = function (name, gender, saying, friendTo) {
  Inhabitant.call(this, name, gender, saying, friendTo);
};
Human.prototype = Object.create(Inhabitant.prototype);
Human.prototype.constructor = Human;
Human.prototype.hands = "2 hands";
Human.prototype.legs = "2 legs";
Human.prototype.type = "human";

let Man = function (name, saying, friendTo) {
  Human.call(this, name, this.gender, saying, friendTo);
};
Man.prototype = Object.create(Human.prototype);
Man.prototype.constructor = Man;
Man.prototype.gender = "male";

let Woman = function (name, saying, friendTo) {
  Human.call(this, name, this.gender, saying, friendTo);
};
Woman.prototype = Object.create(Human.prototype);
Woman.prototype.constructor = Woman;
Woman.prototype.gender = "female";

let Pet = function (name, gender, saying, friendTo) {
  Inhabitant.call(this, name, gender, saying, friendTo);
};
Pet.prototype = Object.create(Inhabitant.prototype);
Pet.prototype.constructor = Pet;
Pet.prototype.type = "pet";

let Dog = function (name, gender, friendTo) {
  Pet.call(this, name, gender, this.saying, friendTo);
};
Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.legs = "4 legs";
Dog.prototype.tail = "1 tail";
Dog.prototype.type = Dog.prototype.type + ": " + "dog";
Dog.prototype.saying = "Bark";

let Cat = function (name, gender, friendTo) {
  Pet.call(this, name, gender, this.saying, friendTo);
};
Cat.prototype = Object.create(Pet.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.legs = "4 legs";
Cat.prototype.tail = "1 tail";
Cat.prototype.type = Cat.prototype.type + ": " + "cat";
Cat.prototype.saying = "Meow";

let dog = new Dog("Ghost", "male", ["Monica", "Tom", "Everybody"]);
let cat = new Cat("Tom", "male", ["Monica", "Chandler", "Everyone who feeds"]);
let woman = new Woman("Monica", "Hello", ["Chandler", "Ghost"]);
let man = new Man("Chandler", "Hi", ["Monica", "Tom"]);

let catWoman = new Cat("Cat-woman", "female", [
  "Chandler dressed as a Pink Bunny",
]);
catWoman.legs = "2 legs";
catWoman.hands = "2 hands";
catWoman.tail = "1 cat-woman's tail";
catWoman.type = "super-hero";

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

let makeMessage = (obj) => {
  let propsArr = [];
  for (let propName in obj) {
    propName !== "constructor"
      ? propsArr.push(propName)
      : console.log("constructor found");
  }
  return propsArr.map((propName) => obj[propName]).join("; ");
};

let world = [dog, cat, woman, man, catWoman];
world.forEach((inhabitant) => print(makeMessage(inhabitant)));

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
