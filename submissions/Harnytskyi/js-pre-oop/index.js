/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Harnytskyi/a-tiny-JS-world
   Web app: https://harnytskyi.github.io/a-tiny-JS-world 
   */

// ======== OBJECTS DEFINITIONS ========
const man = {
    species: 'human',
    name: 'John',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello, everybody!'
};

const woman = {
    species: 'human',
    name: 'Jessica',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Good morning, gays!'
}

const cat = {
    species: 'cat',
    name: 'Tom',
    gender: 'male',
    legs: 4,
    saying: 'Meow!'
};

const dog = {
    species: 'dog',
    name: 'Jerry',
    gender: 'female',
    legs: 4,
    saying: 'Gav!'
};

const inhabitants = [man, woman, cat, dog];

function message(obj) {
    const infoMessage = [
        obj.saying,
        'I am a',
        obj.species + '.',
        'My name is',
        obj.name + '.',
        'My gender is',
        obj.gender + '.',
        `I have`,

        definitionExtremities(obj)
    ];
    return infoMessage.join(' ');
};

function definitionExtremities(obj) {
    if (obj.species == 'human')
        return obj.legs + ' legs and ' + obj.hands + ' hands.';
    else
        return obj.legs + ' paws.';
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

inhabitants.forEach(key => print(message(key)));
