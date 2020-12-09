/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Being {
  constructor(species, name, gender, legs, hands, saying) {
     this.species = species;
     this.name = name;
     this.gender = gender;
     this.legs = legs;
     this.hfnds = hands;
     this.saying = saying;
     this.friends = [];
  };
  addFriends(arr) {
     arr.forEach(item => this.friends.push(item));
  }
};

const dog = new Being ('dog', 'Charlie', 'male', 4, 0, 'woof-woof!');
const cat = new Being ('cat', 'Taffy', 'female', 4, 0, 'meow!');
const man = new Being ('man', 'Bruce', 'male', 2, 2, 'Hi!');
const woman = new Being ('woman', 'Emma', 'female', 2, 2, 'Hello!');
const catWoman = new Being ('cat-woman', 'Patience', 'female', 2, 2, cat.saying);


dog.addFriends([man, woman]);
cat.addFriends([man, woman, catWoman]);
man.addFriends([woman, dog, cat, catWoman]);
woman.addFriends([dog, cat, man]);
catWoman.addFriends([cat, man]);

const inhabitants = [dog, cat, man, woman, catWoman];

const description = obj => {
  const keys = Object.keys(obj);
  return keys.map(key => key === 'friends' ? obj[key].map(item => item.name).join('; ') : obj[key]).join('; ');
};


// ======== OUTPUT ========

inhabitants.forEach(obj => print(description(obj)));


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
