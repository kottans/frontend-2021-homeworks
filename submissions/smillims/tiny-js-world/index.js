/* 
	Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

const cat = {
	species: 'cat',
	name: 'Murka',
	gender: 'female',
	legs: '4',
	saying: 'Hey, I\'m cat.',
};

const man = {
	species: 'human',
	name: 'Jorj',
	surname: 'Kluni',
	gender: 'male',
	legs: '2',
	hands: '2',
	saying:'Did you see Ocean\'s Eleven?',
};

const dog = {
	species: 'dog',
	name: 'Arrow',
	gender: 'female',
	legs: '4',
	saying: 'I were in space, what about you?',
};

const woman = {
	species: 'human',
	name: 'Enn',
	surname: 'Hatuey',
	gender: 'female',
	legs: '2',
	hands: '2',
	saying: 'Follow me on instagram.',
}

const all = [cat, man, dog, woman];

const returnString = (arr) => {
	return arr.map((person) => {
		 return Object.values(person).join("; ");
	}).join("\n");
}

print(returnString(all));
