/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Resident {
  constructor(species, name, gender) {
    this.species = species;
    this.name = name;
    this.gender = gender;
  }
  toString() {
    return `Wonderful creature - <b>${
      this.species
    }</b>, whose name is <b>${
      this.name
    }</b> gender is <b>${
      this.gender
    }</b>!`;
  }
}

class Human extends Resident {
  constructor(name, gender, saying, friends = 'no one') {
    super('human', name, gender);
    this.legs = 2;
    this.hands = 2;
    this.saying = saying;
    this.friends = friends;
  }
  toString() {
    return (
      super.toString() + `</b> Usually the greeting is <b>${
        this.saying
      }</b> The friends of this inhabitant are <b>${
        this.friends.join(', ')
      }</b>. By the wat, this member is owner of <b>${
        this.legs
      } legs</b> and <b>${
        this.hands
      } hands</b>!`
    );
  }
}

class Animal extends Resident {
  constructor(species, name, gender, saying, friends = 'no one') {
    super(species, name, gender);
    this.paws = 4;
    this.saying = saying;
    this.friends = friends;
  }
  toString() {
    return super.toString() + `</b> Usually the greeting is <b>${
      this.saying
    }</b> The friends of this inhabitant are <b>${
      this.friends.join(', ')
    }</b>. By the wat, this member is owner of <b>${
     this.paws
    } paws</b>!`;
  }
}

class Dog extends Animal {
  constructor(name, gender, saying, friends) {
    super('dog', name, gender, saying, friends);
    this.saying =  'woof-woof!';
    this.friends = ['Tom', 'Jenny'];
  }
}

class Cat extends Animal {
  constructor(name, gender, saying, friends) {
    super('cat', name, gender, saying, friends);
    this.saying = 'meow!';
    this.friends =  ['Tom', 'Jenny', 'Selina'];
  }
}

class CatWoman extends Human {
  constructor(name, gender, saying) {
    super(name, gender, saying);
    this.friends = ['Tom', 'Felix'];
    this.saying = new Cat().saying;
  }
}
// ======== OUTPUT ========
/* Use print(message) for output.
Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

Message can contain HTML markup. You may also tweak index.html and/or styles.css.
However, please, REFRAIN from improving visuals at least until your code is reviewed
so code reviewers might focus on a single file that is index.js.
*/
const man = new Human('Tom', 'male', 'Hello Jenny!', ['Tom','Jenny','Rex', 'Selina']),
  women = new Human('Jenny', 'female', 'Hello Tom!', ['Tom', 'Rex', 'Felix']),
  dog = new Dog('Rex', 'male'),
  cat = new Cat('Felix', 'male'),
  catWoman = new CatWoman('Selina', 'female'),
  residents = [man, women, cat, dog, catWoman];

residents.forEach((resident) => print((resident), 'p'));
/* Print examples:
print('ABC');
print('<strong>ABC</strong>');
print('<strong>ABC</strong>', 'div');

print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/
