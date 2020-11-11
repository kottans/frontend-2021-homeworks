/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, phrase, friends, legs) {
    this.friends = friends ? friends : ['no friends'];
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.phrase = phrase;
  }

  sayPhrase() {
    return this.phrase;
  }

  toString() {
    return `Hello! I am <strong>${this.species}</strong>, my name is <strong>${
      this.name
    }</strong>, my gender is <strong>${
      this.gender
    }</strong>,My friends: <strong>${
      this.friends
    }</strong>  and you know what: <strong>${this.saying()}</strong>`;
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, phrase, friends, legs = 4) {
    super('cat', name, gender, phrase, friends, legs);
  }

  toString() {
    return super.toString() + ` I have <strong>${this.legs}</strong> legs`;
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, phrase, friends, legs = 4) {
    super('dog', name, gender, phrase, friends, legs);
  }
  toString() {
    return super.toString() + ` I have <strong>${this.legs}</strong> legs`;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, phrase, friends, hands = 2, legs = 2) {
    super('human', name, gender, phrase, friends, legs);
    this.hands = hands;
  }
  toString() {
    return (
      super.toString() + ` I have <strong>${this.hands}</strong> hands and <strong>${this.legs}</strong> legs`
    );
  }
}

const dog = new Dog('Maki', 'male', 'Bark-bark!');
const cat = new Cat('Prokhor', 'male', 'Meow!');
const man = new Human('Alfred', 'male', 'Master Bruce!');
const woman = new Human('Anna', 'female', 'Need more money!');

dog.friends = [cat.name, man.name];
cat.friends = [woman.name, dog.name];
man.friends = [woman.name, dog.name, cat.name, man.name];
// ======== OUTPUT ========
/* Use print(message) for output.
  Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

  Message can contain HTML markup. You may also tweak index.html and/or styles.css.
  However, please, REFRAIN from improving visuals at least until your code is reviewed
  so code reviewers might focus on a single file that is index.js.
*/

const inhabitants = [man, woman, dog, cat];

inhabitants.forEach((habitant) => print(habitant));

/* Print examples:
  print('ABC');
  print('<strong>ABC</strong>');
  print('<strong>ABC</strong>', 'div');

  print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/
