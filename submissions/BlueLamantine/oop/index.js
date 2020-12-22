/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/BlueLamantine/a-tiny-JS-world
   Web app: https://bluelamantine.github.io//a-tiny-JS-world/
   */
class General {
  constructor({ name, gender, friends, species }) {
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.friends = Array.isArray(friends) ? friends : 'no friends';
  }
  getPronoun(subject) {
    return {
      nominative: (() => {
        return {
          male: 'He',
          female: 'She',
        };
      })()[this.gender],
      posessive: (() => {
        return {
          male: 'his',
          female: 'her',
        };
      })()[this.gender],
    }[subject];
  }
  getInfo() {
    return (
      `This ${this.species} is a ${this.gender}, ` +
      `${this.getPronoun('posessive')} name is ${this.name}. `
    );
  }
  getFriendsList() {
    return `Friend with: ${this.friends}`;
  }
}

class Human extends General {
  constructor({ name, gender, friends, voise }) {
    super({ name, gender, friends, species: 'human' });
    this.voise = voise;
    this.legs = 2;
    this.hands = 2;
  }

  getInfo() {
    return (
      super.getInfo() +
      ` ${this.getPronoun('nominative')} has ${this.legs} legs and ${
        this.hands
      } hands.` +
      ` ${this.getPronoun('nominative')} says \'${this.voise}\'. ` +
      super.getFriendsList()
    );
  }
}

class Man extends Human {
  constructor({ name, friends }) {
    super({ name, gender: 'male', friends, voise: 'What a wonderful world!' });
  }
}

class Woman extends Human {
  constructor({ name, friends }) {
    super({
      name,
      gender: 'female',
      friends,
      voise: 'Feminism is in the air!',
    });
  }
}

class Pet extends General {
  constructor({ name, gender, friends, species, sound }) {
    super({ name, gender, friends, species });
    this.sound = sound;
    this.paws = 4;
  }

  getInfo() {
    return (
      super.getInfo() +
      `The ${this.species} has ${this.paws} paws.` +
      ` Makes a sound \'${this.sound}\'. ` +
      super.getFriendsList()
    );
  }
}

class Cat extends Pet {
  constructor({ name, gender, friends }) {
    super({
      name,
      gender,
      friends,
      species: 'cat',
      sound: 'Meow Purrrr Purrr',
    });
  }
}

class Dog extends Pet {
  constructor({ name, gender, friends }) {
    super({ name, gender, friends, species: 'dog', sound: 'Woof woof' });
  }
}

class CatWoman extends Woman {
  constructor({ name, friends }) {
    super({ name, friends });
    Object.assign(
      this,
      new Cat({
        name: this.name,
        gender: this.gender,
        friends: this.friends,
      })
    );
    this.species = 'cat-woman';
    this.voise = this.sound;
  }
}

const woman = new Woman({ name: 'Eva', friends: ['Garfield', 'Jack'] });

const cat = new Cat({ name: 'Garfield', gender: 'male' });

const catWoman = new CatWoman({ name: 'Mary', friends: ['Eva', 'Garfield'] });

const dog = new Dog({
  name: 'Hachiko',
  gender: 'male',
  friends: ['Eva', 'Jack'],
});

const man = new Man({ name: 'Jack', friends: ['Hachiko', 'Eva'] });

[man, woman, cat, dog, catWoman].map(el => print(el.getInfo(), 'p'));
