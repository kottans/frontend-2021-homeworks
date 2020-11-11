/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

function Inhabitants(species, name, gender, legs, hands, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.sayHi = function() {
        print( "My name is " + this.name + ". I'm " + this.species + ". My gender is " + this.gender +
            ". I have " + this.legs + " legs and " + this.hands + " hands. " + this.saying);
    };
}

const woman = new Inhabitants('human', 'Emilia', 'female', 2, 2, 'Hello, World!');
const man = new Inhabitants('human', 'Efrain', 'male', 2, 2, 'Nice to meet you!');
const cat = new Inhabitants('cat', 'Fluffy', 'female', 4, 0, 'Meow!');
const dog = new Inhabitants('dog', 'Buddy', 'male', 4, 0, 'Woof-woof!');

woman.sayHi();
man.sayHi();
cat.sayHi();
dog.sayHi();

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