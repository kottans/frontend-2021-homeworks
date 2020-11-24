/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

var dog = {
   species: 'dog',
   name: 'Bobik',
   legs: '4', 
   hands: '0',
   gender: 'female',
   greeting: 'Gav-Gav!',
   friends: 'cat, woman, man'
}

var cat = {
   species: 'cat',
   name: 'Aiwa',
   legs: '4',
   hands: '0',
   gender: 'female',
   greeting: 'Myaou-Myaou fff',
   friends: 'woman'
}

var woman = {
   species: 'human',
   name: 'Tanya',
   legs: '2', 
   hands: '2', 
   gender: 'female',
   greeting: 'Hello, Honey!',
   friends: 'cat'
}

var man = {
   species: 'human',
   name: 'Unknown',
   legs: '2',
   hands: '2',
   gender: 'male',
   greeting: 'Hello, my liebe',
   friends: 'dog'
}

var catWoman = cat;
catWoman.species = 'human';
catWoman.name = 'Anna';
catWoman.legs = '2';
catWoman.hands = '2';
catWoman.friends = 'cat, man';



// ======== OUTPUT ========

print(`${dog.species}; <strong>${dog.name}</strong>; ${dog.gender}; ${dog.legs}; ${dog.hands}; ${dog.greeting}; ${dog.friends}`);

print(cat.species + '; <strong>' + cat.name + '</strong>; ' + cat.gender + '; ' + cat.legs + '; ' + cat.hands + '; ' + cat.greeting + '; ' + cat.friends);

print(`${man.species}; <strong>${man.name}</strong>; ${man.gender}; ${man.legs}; ${man.hands}; ${man.greeting}; ${man.friends}`);

print(`${woman.species}; <strong>${woman.name}</strong>; ${woman.gender}; ${woman.legs}; ${woman.hands}; ${woman.greeting}; ${woman.friends}`);

print(`${catWoman.species}; <strong>${catWoman.name}</strong>; ${catWoman.gender}; ${catWoman.legs}; ${catWoman.hands}; ${catWoman.greeting}; ${catWoman.friends}`);






