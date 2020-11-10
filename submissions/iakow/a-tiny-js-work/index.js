const man = {
   species: 'human',
   name: 'Donald',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Aloha!',
};

const woman = {
   species: 'human',
   name: 'Eva',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello',
};

const cat = {
   species: 'cat',
   name: 'Murka',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'Meow...',
};

const dog = {
   species: 'dog',
   name: 'Gektor',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'WOFFF!',
};

const catWoman = {
   species: 'humacat',
   name: 'Akrum',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
};

man.friends = [woman, dog];
woman.friends = [man, cat];
dog.friends = [man, woman, catWoman, cat];
catWoman.friends = [cat, woman];

const formHabitantСertificate = obj => {
   const props = Object.keys(obj).map(key => {
      if (key === 'friends') {
         return obj[key].map(friend => friend.name).join(', ');
      }

      return obj[key];
   })

   return props.join('; ');
}

[man, woman, cat, dog, catWoman].forEach((obj) => print(formHabitantСertificate(obj)));
