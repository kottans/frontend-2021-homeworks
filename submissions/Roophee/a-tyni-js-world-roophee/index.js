const dog = {
    species: 'dog',
    name: 'Milo',
    gender: 'male',
    legs: 4,
    hands: 0,
    tail: 1,
    saying: 'Woof-Woof!',
    friends: ['Sam', 'Hanna', 'Kitty']
},
    cat = {
    species: 'cat',
    name: 'Kitty',
    gender: 'female',
    legs: 4,
    hands: 0,
    tail: 1,
    saying: 'Meow!',
    friends: []
},
    man = {
    species: 'human',
    name: 'Sam',
    gender: 'male',
    legs: 2,
    hands: 2,
    tail: 0,
    saying: 'Hello, my friend!',
    friends: ['Hanna',]
},
    woman = {
    species: 'human',
    name: 'Hanna',
    gender: 'female',
    legs: 2,
    hands: 2,
    tail: 0,
    saying: 'Hi, I\`m Hanna!',
    friends: ['Sam', 'Kitty', 'Milo']
},
    womanCat = {
    species: 'human',
    name: 'Sara',
    gender: 'female',
    legs: 2,
    hands: 2,
    tail: 1,
    saying: cat.saying,
    friends: ['Sam', 'Hanna', 'Kitty', 'Milo']
}

let population = [man, woman, cat, dog, womanCat],
    paramsOfItem = ['species', 'name', 'saying', 'gender', 'legs', 'hands', 'tail','friends'];

let makeOutputString = item => {
    return paramsOfItem.map(param => item[param]).join(';');
}

population.forEach(anyAnimal => {
    print(makeOutputString(anyAnimal));
});
