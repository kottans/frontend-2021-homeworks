/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Lu-sure/Lu-sure.github.io/tree/main/A_tiny_JS_world
   Web app: https://lu-sure.github.io/A_tiny_JS_world/
   */

  const dog = {
    species: 'dog',
    name: 'Easy',
    gender: 'female',
    age: 2,
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friendly: 'everyone'
  };
 
  const cat = {
    species: 'cat',
    name: 'Roxy',
    gender: 'female',
    age: 1,
    legs: 4,
    hands: 0,
    saying: 'meow!!',
    friendly: 'Lila'
  };
 
  const man = {
    species: 'human',
    name: 'Kolia',
    gender: 'male',
    age: 26,
    legs: 2,
    hands: 2,
    saying: 'Let`s work all day long!',
    friendly: 'Love, Easy'
  };
 
  const woman = {
    species: 'human',
    name: 'Love',
    gender: 'female',
    age: 26,
    legs: 2,
    hands: 2,
    saying: 'Absolutely agree!',
    friendly: 'Easy, Kolia'
  };
 
  const catWoman = {
    species: 'cat+human',
    name: 'Lila',
    gender: 'female',
    age: 21,
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friendly: 'Roxy, Kolia'
  };
 
 const inhabitants = [dog, cat, man, woman, catWoman];
 
 const getPrintText = (obj) => Object.values(obj).join('; ');
 
 inhabitants.forEach(creature => print(getPrintText(creature)));
 