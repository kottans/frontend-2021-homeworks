/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Resident {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.friends = friends;
    this.saying = saying;
  }
  toString() {
    return `Wonderful creature - <b>${this.species}</b>, 
      whose name is <b>${this.name}</b>, 
      the gender is <b>${this.gender}</b>! 
      Usually the greeting is <b>${this.saying}</b> 
      The friends of this inhabitant are <b>${this.friends.join(', ')}</b>. `;
  }
}

class Human extends Resident {
  constructor(name, gender, saying, friends, legs = 2, hands = 2) {
    super('human', name, gender, saying, friends);
    this.legs = legs;
    this.hands = hands;
  }
  toString() {
    return (
      super.toString() +
      `By the wat, this member is owner of <b>${this.legs} legs</b> and <b>${this.hands} hands</b>!`
    );
  }
}

class Animal extends Resident {
  constructor(species, name, gender, saying, friends, paws = 4) {
    super(species, name, gender, saying, friends);
    this.paws = paws;
  }
  toString() {
    return (
      super.toString() +
      `By the wat, this member is owner of <By>${this.paws} paws</By>!`
    );
  }
}

class Dog extends Animal {
  constructor(name, gender, saying, friends) {
    super('dog', name, gender, saying, friends);
  }
}

class Cat extends Animal {
  constructor(name, gender, saying, friends) {
    super('cat', name, gender, saying, friends);
  }
}

class CatWoman extends Human {
  constructor(name, friends = ['Tom', 'Felix']) {
    super(name, 'female', CatWoman.saying(), friends);
  }

  static saying() {
    return 'meow!';
  }
}

// ======== OUTPUT ========
/* Use print(message) for output.
Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

Message can contain HTML markup. You may also tweak index.html and/or styles.css.
However, please, REFRAIN from improving visuals at least until your code is reviewed
so code reviewers might focus on a single file that is index.js.
*/
const man = new Human('Tom', 'male', 'Hello Jenny!', ['Tom', 'Jenny', 'Rex', 'Selina']),
  women = new Human('Jenny', 'female', 'Hello Tom!', ['Tom', 'Rex', 'Felix']),
  dog = new Dog('Rex', 'male', 'woof-woof!', ['Tom', 'Jenny']),
  cat = new Cat('Felix', 'male', 'meow!', ['Tom', 'Jenny', 'Selina']),
  catWoman = new CatWoman('Selina'),
  residents = [man, women, cat, dog, catWoman];

residents.forEach((resident) => print(resident, 'p'));

/* Print examples:
print('ABC');
print('<strong>ABC</strong>');
print('<strong>ABC</strong>', 'div');

print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/
