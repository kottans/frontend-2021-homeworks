/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/ik-web/a-tiny-JS-world
   Web app: https://ik-web.github.io/a-tiny-JS-world/

*/

// ======== OBJECTS DEFINITIONS ========
let catSaying = 'meow';
const dog = {
   species: 'dog',
   name: 'Bobik',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
 };

const cat = {
   species: 'cat',
   name: 'Barsik',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: catSaying
};

const man = {
   species: 'human',
   name: 'Benjamin',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi to all!'
};

const woman = {
   species: 'human',
   name: 'Sarah',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello everyone!'
};

const catWoman = {
   species: 'mystery of nature',
   name: 'anonymous',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: catSaying
};

// ======== OUTPUT ========
const tinyJsWorldPopulation = [dog, cat, man, woman, catWoman];

function toPrint(arr) {
   arr.forEach( function(obj) {
      print(`A ${obj.species} (<i>${obj.gender}<i>) named <strong>${obj.name}</strong> has ${obj.legs} legs and ${obj.hands} hands, likes to say <u>${obj.saying}</u>`);
   });
}

toPrint(tinyJsWorldPopulation);
