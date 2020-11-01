/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/evgenii-del/a-tiny-JS-world
   Web app: http://crooked-discovery.surge.sh/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const man = {
    species: 'man',
    name: 'John',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'I want to learn JS!'
};

const woman = {
    species: 'woman',
    name: 'Emma',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'I want to learn JS!'
};

const cat = {
    species: 'cat',
    name: 'Sam',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'meow-meow!'
};

const dog = {
    species: 'dog',
    name: 'Bob',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!'
};

function toString(object) {
    return [object.species, object.name, object.gender, object.legs, object.hands, object.saying].join(';');
}

[man, woman, cat, dog].forEach(object => print(toString(object)));

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
