class Inhabitant {
    constructor ({ species, name, gender, legs, hands, saying, friends = [] }) {
        this.species = species
        this.name = name
        this.gender = gender
        this.legs = legs
        this.hands = hands
        this.saying = saying
        this.friends = friends
    }
}

class Animal extends Inhabitant {
    constructor ({ species, name, gender, saying, friends }) {
        super({ species, name, gender, legs: 4, hands: 0, saying, friends })
    }
}

class Dog extends Animal {
    constructor ({ name, gender, friends }) {
        super({ species: 'dog', name, gender, saying: 'woof-woof', friends })
    }
}

class Cat extends Animal {
    constructor ({ name, gender, friends }) {
        super({ species: 'cat', name, gender, saying: 'meow-meow', friends })
    }
}

class HomoSapiens extends Inhabitant {
    constructor ({ name, gender, saying, friends }) {
        super({ species: 'human', name, gender, legs: 2, hands: 2, saying, friends })
    }
}

class Woman extends HomoSapiens {
    constructor({ name, saying, friends }) {
        super({ name, gender: 'female', saying, friends })
    }
}

class Man extends HomoSapiens {
    constructor({ name, saying, friends }) {
        super({ name, gender: 'male', saying, friends })
    }
}

const dog = new Dog({ name: 'Spike', gender: 'male', friends: ['Dolf', 'Roman', 'Mariia'] })
const cat = new Cat({ name: 'Dolf', gender: 'male'})
const man = new Man({ name: 'Roman', saying: 'Hello!', friends: ['Dolf', 'Roman', 'Mariia'] })
const woman = new Woman({ name: 'Mariia', saying: 'Hi!', friends: ['Dolf', 'Roman', 'Mariia'] })

const inhabitants = [dog, cat, man, woman]

const introduceInhabitants = (inhabitants) => {
    const inhabitantValues = Object.values(inhabitants)
    const inhabitant = inhabitantValues.map(item => Array.isArray(item) ? item.map(nestedItem => nestedItem).join(', ') : item).join('; ')
    return inhabitant
}

inhabitants.forEach((item) => {
    print(introduceInhabitants(item))
})
