/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/BlueLamantine/a-tiny-JS-world
   Web app: https://bluelamantine.github.io//a-tiny-JS-world/
*/

const man = {
   species: 'Human',
   name: 'Parker',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'What a wonderful world!',
   friends: ['Eva','Hachiko']
};
 const dog = {
   species: 'Dog',
   name: 'Hachiko',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Woof-woof',
   friends: ['Parker']
};
const woman = {
   species: 'Human',
   name: 'Eva',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Feminism in the air!',
   friends: ['Parker', 'Garfield']
};
const cat = {
   species: 'Cat',
   name: 'Garfield',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Meoooooow',
   friends: ['Eva','Parker']
};
const catWoman = {
   species: 'Supernatural',
   name: 'Mary',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friends: 'No friends'
};
const jsWorld = [man,woman,dog,cat,catWoman];

jsWorld.forEach( el => {
   print(Object.values(el).join(';'));
});
