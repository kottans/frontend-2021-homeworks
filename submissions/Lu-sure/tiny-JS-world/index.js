/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Lu-sure/Lu-sure.github.io/tree/main/A_tiny_JS_world
   Web app: https://lu-sure.github.io/A_tiny_JS_world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
   species: 'dog',
   name: 'Easy',
   gender: 'female',
   age: '2',
   legs: 4,
   hands: 0,
   saying: {text: 'woof-woof!'},
   friendly: 'everyone'
 };

 const cat = {
   species: 'cat',
   name: 'Roxy',
   gender: 'female',
   age: '1',
   legs: 4,
   hands: 0,
   saying: {text: 'meow!!'},
   friendly: 'Lila'
 };

 const man = {
   species: 'human',
   name: 'Kolia',
   gender: 'male',
   age: '26',
   legs: 2,
   hands: 2,
   saying: {text: 'Let`s start at 9 a.m!'},
   friendly: 'Love, Easy'
 };

 const woman = {
   species: 'human',
   name: 'Love',
   gender: 'female',
   age: '26',
   legs: 2,
   hands: 2,
   saying: {text: 'Fine, ok!'},
   friendly: 'Easy, Kolia'
 };

 const catWoman = {
   species: 'cat+human',
   name: 'Lila',
   gender: 'female',
   age: '21',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friendly: 'Roxy, Kolia'
 };

const inhabitants = [dog, cat, man, woman, catWoman];

const getPrintText = (obj) => Object.values(obj)
  .reduce((acc, value) => {
      const perfix = acc !== '' ? '; ' : '';
      let text = value;
      if (value != null && !Array.isArray(value) && typeof value === 'object') text = getPrintText(value);
      return `${acc}${perfix}${text}`;
   }, '');

// ======== OUTPUT ========
for (let i=0; i<inhabitants.length; i++) {
   print(getPrintText(inhabitants[i]));
};
