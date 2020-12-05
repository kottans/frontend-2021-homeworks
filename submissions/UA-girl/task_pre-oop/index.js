/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/UA-girl/a-tiny-JS-world
   Web app: https://ua-girl.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const woman = {
    species: 'human',
    name: 'Alice',
    age: 25,
    gender: 'female',
    legs: 2,
    hands: 2,
    say: 'Hello, dear!',
    friends: ['Adam', 'Stephany', 'Iren']
}

const man = {
    species: 'human',
    name: 'Adam',
    age: 35,
    gender: 'male',
    legs: 2,
    hands: 2,
    say: 'Hey!',
    friends: ['Alice', 'Stephany', 'Jeorge', 'Jack']
}

const dog = {
    species: 'dog',
    name: 'Margo',
    age: 5,
    gender: 'female',
    legs: 4,
    hands: 0,
    say: 'Buf-buf!',
    friends: ['Jack', 'Pashtet', 'Cesar']
}

const cat = {
    species: 'cat',
    name: 'Pashtet',
    age: 8,
    gender: 'male',
    legs: 4,
    hands: 0,
    say: 'Meu-meu!',
    friends: ['Margo', 'Murka']
}

// ======== OUTPUT ========

function createMessageForPrint(obj) {
    let message = `My name is <strong>${obj.name}</strong>. I am a <strong>${obj.species}</strong>. I am a <strong>${obj.age}</strong> old <strong>${obj.gender}</strong>. `;
    message += `I have <strong>${obj.hands ? obj.hands : 'no'}</strong> hands and <strong>${obj.legs}</strong>. I can say <strong>"${obj.say}"</strong> to my friends <strong>${obj.friends.join(', ')}</strong>.`;
    return message
}

const inhabitats = [man, woman, dog, cat];
inhabitats.forEach(item => print(createMessageForPrint(item, 'div')));