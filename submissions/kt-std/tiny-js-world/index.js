/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
   
   function Inhabitant (species, name, gender, hands, legs, sayings, friends){
   		this.species = species;
   		this.name = name;
   		this.gender = gender;
   		this.hands = hands === 0 ? `${this.species}s don't have hands! They have paws`: hands;
   		this.legs = legs;
   		this.friends = Array.isArray(friends) && friends.length ? friends : 'Forever alone...';
   		this.saySomething = sayings;
   }

   const dog = new Inhabitant('dog', 'Rex', 'male', 0, 4, 'Woof!', ['Mukhtar', 'Sharik', 'Thunder']);
   const cat = new Inhabitant('cat', 'Murka', 'female', 0, 4, 'Meow!', ['Murchik', 'Anna']);
   const woman = new Inhabitant('woman', 'Anna', 'female', 2, 2, 'Hi, folks!', ['John', 'Tom']);
   const man = new Inhabitant('man', 'John', 'male', 2, 2, 'Ahoy!');
   const catWoman = new Inhabitant('superhero', 'Selina', 'female?', 2, 2, cat.saySomething, ['Alice', 'Arizona']);

   ((array) => {
	   array.forEach( obj => {
	   	let string = '';
	   	for(prop in obj){
	   		Array.isArray(obj[prop])? string += `${obj[prop].join(", ")}; ` : string += `${obj[prop]}; `;
	   	}
	   	print(string);
	   });
   })([dog, cat, woman, man, catWoman]);


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


