/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: 'dog',
  name: 'Charlie',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!'
};
const cat = {
  species: 'cat',
  name: 'Taffy',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow!'
};
const man = {
  species: 'man',
  name: 'Bruce',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hi!'
};
const woman = {
  species: 'woman',
  name: 'Emma',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hello!'
};
const catWoman = {
  species: 'cat-woman',
  name: 'Catwoman',   
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying
};
dog.friends = [man, woman];
cat.friends = [man, woman, catWoman];
man.friends = [woman, dog, cat, catWoman];
woman.friends = [dog, cat, man];
catWoman.friends = [cat, man];

const inhabitants = [dog, cat, man, woman, catWoman];

const description = obj => {
  const nameFriends = obj.friends.reduce((result, item) => result + `${item.name}; `, '')
  return `${obj.species}; ${obj.name}; ${obj.gender}; ${obj.legs}; ${obj.hands}; ${obj.saying}; ${nameFriends}`  
};


// ======== OUTPUT ========

inhabitants.forEach(obj => print(Description(obj)));

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


