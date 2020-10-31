/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const man = {
      species: 'human',
      name: 'Tom',
      gender: 'male',
      legs: 2,
      hands: 2,
      paws: 0,
      saying: 'Hello Jenny!',
      friends: ['Tom', 'Jenny', 'Rex', 'Selina']
   },
   woman = {
      species: 'human',
      name: 'Jenny',
      gender: 'female',
      legs: 2,
      hands: 2,
      paws: 0,
      saying: 'Hello Tom!',
      friends: ['Tom', 'Rex', 'Felix']
   },
   dog = {      
      species: 'dog',
      name: 'Rex',
      gender: 'male',
      legs: 0,
      hands: 0,
      paws: 4,
      saying: 'woof-woof!',
      friends: ['Tom', 'Jenny']
   },
   cat = {
      species: 'cat',
      name: 'Felix',
      gender: 'male',
      legs: 0,
      hands: 0,
      paws: 4,
      saying: 'meow!',
      friends: ['Tom', 'Jenny', 'Selina']
   },
   catWoman = {
      species: 'human',
      name: 'Selina',
      gender: 'female',
      legs: 2,
      hands: 2,
      paws: 0,
      saying: cat.saying,
      friends: ['Tom', 'Felix']
   };

// ======== OUTPUT ========
/* Use print(message) for output.
Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

Message can contain HTML markup. You may also tweak index.html and/or styles.css.
However, please, REFRAIN from improving visuals at least until your code is reviewed
so code reviewers might focus on a single file that is index.js.
*/
const createStory = (character, index) => {
   let speciesDiff;
   if(character.paws > 0) speciesDiff = `<b>${character.paws}</b> paws`;
   else speciesDiff = `<b>${character.legs}</b> legs and <b>${character.hands}</b> hands`;
   return  `Wonderful creature - <b>${character.species}</b>, whose name is <b>${character.name}</b>! This <b>${index+1}th</b> member is the owner of ${speciesDiff}, usually the greeting is <i style="text-decoration:underline;"><b>${character.saying}</b></i> and friends of this inhabitant are <b>${character.friends.join(', ')}</b>.`;
};
   
Array.from([man, woman, cat, dog, catWoman], (elem, index) => print(createStory(elem, index), 'p'));
/* Print examples:
print('ABC');
print('<strong>ABC</strong>');
print('<strong>ABC</strong>', 'div');

print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/

