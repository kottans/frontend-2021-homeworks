/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const boi = {
   species: 'human',
   name: 'Dadia Fedor',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Я ничей. Я сам по себе мальчик. Свой собственный.',
   friends: []
}

const mama = {
   species: 'human',
   name: 'Rimma',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Это не техника дошла, а я сама сюда дошла, на лыжах!',
   friends: []
}

const papa = {
   species: 'human',
   name: 'Dmitriy',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Здравствуйте! Угадайте, кто я?',
   friends: []
}

const kot = {
   species: 'cat',
   name: 'Matroskin',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Не правильно ты, дядя Фёдор, бутерброд ешь...',
   friends: []
}

const pes = {
   species: 'dog',
   name: 'Sharik',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Попрошу внимания! Сделайте, пожалуйста, умные лица!',
   friends: []
}

/* Define cat-woman?
   There is not cat-woman in prostokvashino.
   But where is pochtalion peckin?
   Haha, vot ge on:
*/
const pochtalion = {
   ...papa,
   name: 'Pochtalion Pechkin',
   saying: 'Я почему вредный был? Потому что у меня велосипеда не было!'
}

// Lets define some friends:
boi.friends = [mama, papa, kot, pes]
mama.friends = [boi, papa]
papa.friends = [boi, mama]
kot.friends = [boi, pes]
pes.friends = [boi, kot]
// No friends for Pechking, only bycicle.

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

const prostokvashino = [boi, mama, papa, kot, pes, pochtalion]

const prettyOutput = ({
   species,
   name,
   gender,
   legs,
   hands,
   saying,
   friends
}) => `Hello there :wave: My species is ${species}, my name is ${name} and I'm ${gender} with ${legs} legs and ${hands} hands. 
      My favourite quote: ${saying} for my Best friends: ${friends.map(friend => friend.name).join(', ')}`;

prostokvashino.forEach(person => print(prettyOutput(person)));
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/
