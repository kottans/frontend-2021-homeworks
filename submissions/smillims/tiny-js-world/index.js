/* 
	Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/

const inhabits = [
	cat = {
		species: 'cat',
		name: 'Murka',
		surname: 'My hosts didn\'t give me a surname',
		gender: 'female',
		legs: '4',
		saying: 'Hey, I\'m cat',
	},
	man = {
		species: 'human',
		name: 'Jorj',
		surname: 'Kluni',
		gender: 'male',
		legs: '2',
		hands: '2',
		saying:'Did you see Ocean\'s Eleven?',
	},
	man = {
		species: 'superhuman',
		name: 'Peter',
		surname: 'Parker',
		gender: 'male',
		legs: '2',
		hands: '2',
		saying: 'Your friendly neighborhood Spider-Man!',
	},
	pig = {
		species: 'guinea pig',
		name: 'Darwin',
		surname: 'My hosts didn\'t give me a surname',
		gender: 'male',
		legs: '4',
		saying: 'Set aside. I forbid touching the ferret.',
	},
]

const returnString = (arr) => {
	return arr.map((person) => {
		 return Object.values(person).join("; ");
	}).join("\n");
}

print(returnString(inhabits));
