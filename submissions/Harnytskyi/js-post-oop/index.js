/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://harnytskyi.github.io/a-tiny-JS-world
   Web app: https://github.com/Harnytskyi/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
    constructor(species, name, gender, saying, friends) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.addFriends(friends);
    };
    getListFriends(){
        if (this.friends == null){
            return "I have not a friends. "
        }
        else{
            return `My friends: ${this.friends.map(element => element.name).join(', ')}. `;
        }
    }
    addFriends(friends){
        if(this.friends == null)
            this.friends = friends;
        else
            this.friends = this.friends.concat(friends);
    }

    toString() {
        return [
            this.saying,
            `I am a ${this.species}.`,
            `My name is ${this.name}.`,
            `My gender is ${this.gender}.`,
            this.getListFriends()
        ].join(' ');
    }
}
class Human extends Inhabitant {
    constructor(name, gender, saying, friends) {
        super('human', name, gender, saying, friends);
        this.legs = 2;
        this.hands = 2;
    };
    toString(){
        return super.toString() + `I have ${this.legs} legs and ${this.hands} hands.`;
    }
}
class Man extends Human {
    constructor(name, saying, friends) {
        super(name, 'male', saying, friends);
        
    }
}
class Woman extends Human {
    constructor(name, saying, friends) {
        super(name, 'female', saying, friends);
    }
}
class Mammal extends Inhabitant{
    constructor(species, name, gender, saying, friends){
        super(species, name, gender, saying, friends);
        this.paws = 4;
    };
    toString(){
        return super.toString() + `I have ${this.paws} paws.`;
    }
}

class Dog extends Mammal {
    constructor(name, gender, friends) {
        super('dog', name, gender, 'Gav', friends);
    }
}
class Cat extends Mammal {
    constructor(name, gender, friends) {
        super('cat', name, gender, 'Meow', friends);
    }
}

const man = new Man('John', 'Hello, everybody!');
const woman = new Woman('Jessica', 'Good morning, gays!');
const cat = new Cat('Tom', 'male');
const dog = new Dog('Jerry', 'female', [woman]);

man.addFriends([woman, dog]);
woman.addFriends([cat]);
dog.addFriends([man]);
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

const inhabitants = [man, woman, cat, dog];
inhabitants.forEach(inhabitant => print(inhabitant));

