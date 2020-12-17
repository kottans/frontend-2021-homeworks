/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/ORybka/a-tiny-JS-world
   Web app: https://orybka.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const man = {
   species: 'human',
   name: 'John',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: "Hey! What's up?",
   friends: ['Mary', 'Marley', 'Tisha'],
 };
 
 const woman = {
   species: 'human',
   name: 'Mary',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hey there!',
   friends: ['John', 'Marley', 'Tisha'],
 };
 
 const dog = {
   species: 'dog',
   name: 'Marley',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!',
   friends: ['John', 'Mary', 'Selina'],
 };
 
 const cat = {
   species: 'cat',
   name: 'Tisha',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'meow-purr!',
   friends: [],
 };
 
 const catWoman = {
   species: 'catWoman',
   name: 'Selina',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friends: ['Tisha'],
 };
 
 // ======== OUTPUT ========
 
 const objects = [man, woman, dog, cat, catWoman];
 
 objects.forEach((el) => {
   const objFriends = el.friends.join(', ');
   const objValues = [el.species, `<strong>${el.name}</strong>`, el.gender, el.legs, el.hands, `<em>${el.saying}</em>`, objFriends];
   print(objValues.join('; '), 'div');
 });
 