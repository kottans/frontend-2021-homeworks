/* 
   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
*/


const inhabits = [
	{
		species: 'cat',
		name: 'Murka',
		surname: 'My hosts didn\'t give me a surname',
		gender: 'female',
		legs: 'Have 4 legs',
		hands: 'Cats haven\'t hands :(',
		saying: 'Hey, I\'m cat',
	},
	{
		species: 'human',
		name: 'Jorj',
		surname: 'Kluni',
		gender: 'male',
		legs: 'Have 2 legs',
		hands: 'Have 2 hands',
		saying:'Did you see Ocean\'s Eleven?',
	},
	{
		species: 'superhuman',
		name: 'Peter',
		surname: 'Parker',
		gender: 'male',
		legs: 'Have 2 legs',
		hands: 'Have 2 hands, sometimes more :)',
		saying: 'Your friendly neighborhood Spider-Man!',
	},
	{
		species: 'guinea pig',
		name: 'Darwin',
		surname: 'My hosts didn\'t give me a surname',
		gender: 'male',
		legs: 'Have 4 legs',
		hands: 'I haven\'t hands, srr',
		saying: 'Set aside. I forbid touching the ferret.',
	},
]

const returnString = (arr) => {
	return arr.map((person) => {
		 return Object.values(person).map(info => info).join("; ");
	}).join("\n");
}

print(returnString(inhabits));
