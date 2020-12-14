/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
    species: 'human',
    name: 'Sasha',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello world',
 };
 
 const woman = {
    species: 'human',
    name: 'Julia',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hi there',
 };
 
 const cat = {
    species: 'cat',
    name: 'Tom',
    gender: 'male',
    legs: 4,
    hands: 'no',
    saying: 'Meow meow',
 };
 
 const dog = {
    species: 'dog',
    name: 'Jack',
    gender: 'male',
    legs: 4,
    hands: 'no',
    saying: 'Bow wow',
 };
 
 const catWoman = {
    species: 'woman',
    name: 'Selina',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying
 };
 
 // ======== OUTPUT ========
 
 const inhabitants = [man, woman, cat, dog, catWoman];
 
 const message = (obj) => `${obj.saying}! I am a ${obj.species} and my name is ${obj.name}. My gender is ${obj.gender}. I have ${obj.legs} legs and ${obj.hands} hands.`
 
 inhabitants.forEach( inh => print(message(inh)) ); 
 
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
 
 