const dog = {
    species: 'dog',
    name: 'Milo',
    gender: 'male',
    legs: 4,
    hands: 0,
    tail: 1,
    saying: 'Woof-Woof!',
    friends: ['Sam', 'Hanna', 'Kitty']
}

const cat = {
    species: 'cat',
    name: 'Kitty',
    gender: 'female',
    legs: 4,
    hands: 0,
    tail: 1,
    saying: 'Meow!',
    friends: []
}

const man = {
    species: 'human',
    name: 'Sam',
    gender: 'male',
    legs: 2,
    hands: 2,
    tail: 0,
    saying: 'Hello, my friend!',
    friends: ['Hanna',]
}

const woman = {
    species: 'human',
    name: 'Hanna',
    gender: 'female',
    legs: 2,
    hands: 2,
    tail: 0,
    saying: 'Hi, I\`m Hanna!',
    friends: ['Sam', 'Kitty', 'Milo']
}

const womanCat = {
    species: 'human',
    name: 'Sara',
    gender: 'female',
    legs: 2,
    hands: 2,
    tail: 1,
    saying: cat.saying,
    friends: ['Sam', 'Hanna', 'Kitty', 'Milo']
}

let toStringTask = function (item) {
    let string = '';
    for (let i in item) {
        string += item[i] + ';';
    }
    return string;
}

let population = [man, woman, cat, dog, womanCat];

population.map(i => print(toStringTask(i)));
