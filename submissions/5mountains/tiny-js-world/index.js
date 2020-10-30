/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {},
   woman = {},
   dog = {},
   cat = {},
   catWoman = {};

man.species ='human';
man.name = 'Tom';
man.gender = 'male';
man.legs = 2;
man.hands = 2;
man.paws = 0;
man.saying = 'Hello Jenny!';
man.friends = ['Tom', 'Jenny', 'Rex', 'Selina'];

woman.species ='human';
woman.name = 'Jenny';
woman.gender = 'female';
woman.legs = 2;
woman.hands = 2;
woman.paws = 0;
woman.saying = 'Hello Tom!';
woman.friends = ['Tom', 'Rex', 'Felix'];

dog.species ='dog';
dog.name = 'Rex';
dog.gender = 'male';
dog.legs = 0;
dog.hands = 0;
dog.paws = 4;
dog.saying = 'woof-woof!';
dog.friends = ['Tom', 'Jenny'];

cat.species ='cat';
cat.name = 'Felix';
cat.gender = 'male';
cat.legs = 0;
cat.hands = 0;
cat.paws = 4;
cat.saying = 'meow!';
cat.friends = ['Tom', 'Jenny', 'Selina'];

catWoman.species = undefined;
catWoman.name = 'Selina';
catWoman.gender = 'female';
catWoman.legs = undefined;
catWoman.hands = undefined;
catWoman.paws = undefined;
catWoman.saying = cat.saying;
catWoman.friends = ['Tom', 'Felix'];
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
const residents = new Array(man, woman, cat, dog, catWoman);

const createStory = function() {
   let sentence = '';
   for(let character of residents) {
      sentence += `<p><b>Welcome</b>, wanderer, let me tell you briefly about our resident - a wonderful <b>${character.species}</b> creature, the name is <b>${character.name}</b>! This member is the owner of legs, number is ${character.legs}, of hands, number is ${character.hands} or of paws, number is ${character.paws}, usually the greeting is <i style="text-decoration:underline;">${character.saying}</i> and friends of this inhabitant are ${character.friends.join(', ')}.</p>`;
   }
   return sentence;
};

const printStory = function() {
   print(createStory(), 'div');
};

document.addEventListener('DOMContentLoaded', init = () => {
   printStory();
   document.removeEventListener('DOMContentLoaded', init);
});

