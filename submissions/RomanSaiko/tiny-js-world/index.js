const dog = {
    species: 'dog',
    name: 'Spike',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof',
    friends: ['Dolf', 'Roman', 'Mariia']
}

const cat = {
    species: 'cat',
    name: 'Dolf',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'meow-meow',
    friends: ['Anne Hathaway']
}

const man = {
    species: 'man',
    name: 'Roman',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello!',
    friends: ['Dolf', 'Spike', 'Mariia']
}

const woman = {
    species: 'woman',
    name: 'Mariia',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hi!',
    friends: ['Dolf', 'Spike', 'Roman']
}

const catWoman = {
    species: 'cat-woman',
    name: 'Anne Hathaway',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: ['Dolf', 'Spike']
}

const inhabitants = [dog, cat, man, woman, catWoman]

console.log(inhabitants);

for(let i = 0; i < inhabitants.length; i++) {
    print(`${inhabitants[i].species}; ${inhabitants[i].name}; ${inhabitants[i].gender}; ${inhabitants[i].legs}; ${inhabitants[i].hands}; ${inhabitants[i].saying}; ${inhabitants[i].friends.map(item => item)}.`);
}
