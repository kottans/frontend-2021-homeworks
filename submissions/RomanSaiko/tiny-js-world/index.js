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

const introduceInhabitants = (inhabitants) => {
    const inhabitantValues = Object.values(inhabitants)
    const inhabitant = inhabitantValues.map(item => Array.isArray(item) ? item.map(nestedItem => nestedItem).join(', ') : item).join('; ')
    return inhabitant;
}

inhabitants.forEach((item) => {
    print(introduceInhabitants(item))
})
