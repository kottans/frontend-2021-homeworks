/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
	species: "dog",
	name: "Toby",
	gender: "male",
	legs: 4,
	hands: 0,
	saying: "BaRk!!",
};
const cat = {
	species: "cat",
	name: "Tima",
	gender: "male",
	legs: 4,
	hands: 0,
	saying: "Meooow!!",
};
const woman = {
	species: "human",
	name: "Mella",
	gender: "female",
	legs: 2,
	hands: 2,
	saying: "Okay honey",
};
const man = {
	species: "human",
	name: "Antonio",
	gender: "male",
	legs: 2,
	hands: 2,
	saying: "Yabba dabba doo",
};
const catWoman = {
	species: "catHuman",
	name: "Selina",
	gender: "female",
	legs: 2,
	hands: 2,
	saying: cat.saying,
};
const inhabitants = [dog, cat, man, woman, catWoman];
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
inhabitants.forEach((being) => {
	print([being.species, being.name, being.gender, being.legs, being.hands, being.saying].join("; ") + "\n");
});
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
