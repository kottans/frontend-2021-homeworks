class Inhabitant {
    constructor ({ species, name, gender, saying, friends = "No friends! One man army" }) {
        this.species = species
        this.name = name
        this.gender = gender
        this.saying = saying
        this.friends = friends
    }

    toString() {
        const props = Object.entries(this).map(([key, value]) => `${key}: ${value}` )
        return`${props.join("; ")}`
    }
}

class Animal extends Inhabitant {
    constructor ({ species, name, gender, saying, friends, paws = 4 }) {
        super({ species, name, gender, saying, friends })
        this.paws = paws
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
    constructor ({ name, gender, saying, friends, hands = 2, legs = 2 }) {
        super({ species: 'human', name, gender, saying, friends })
        this.hands = hands
        this.legs = legs
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

inhabitants.forEach((item) => {
    print(item.toString())
})
