/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {	
	species:"dog",
	name:"Rex",
	gender:"male",
	legs:4,
	hands:0,
	saying:"WOOF!",
	friends: ["Joey"," Lisa"]
};
const cat = {
	species:"cat",
	name:"Milka",
	gender:"female",
	legs:4,
	hands:0,
	saying:"meeeow!",
	friends: ["Selina"]	
};
const man = {
	species:"human",
	name:"Joey",
	gender:"male",
	legs:2,
	hands:2,
	saying:"How you doin'?",
	friends: ["Rex"," Lisa"]
};
const woman = {
	species:"human",
	name:"Lisa",
	gender:"female",
	legs:2,
	hands:2,
	saying:"Hello!",
	friends: ["Joey"," Rex"," Selina"]
};
const catWoman = {
	species:"cat-woman",
	name:"Selina",
	gender:"female",
	legs:2,
	hands:2,
	saying:cat.saying,
	friends: ["Milka"," Lisa"]
}
const inhabitants = [dog, cat, man, woman, catWoman];
const properties = ["species", "name", "gender", "legs", "hands", "saying", "friends"]
const formString = inhabitant => {
	return properties.map(prop=>inhabitant[prop]).join("; ")
}
// ======== OUTPUT ========
inhabitants.forEach(inhabitant => print(formString(inhabitant)));
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
   