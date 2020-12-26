const dog = {
   species: 'dog',
   name: 'Jack',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!', 
};

const cat = {
   species: 'cat',
   name: 'Cherry',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'may-may!'
};
 
const woman = {
   species: 'woman',
   name: 'Glora',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello, Peter!'
};

const man = {
   species: 'man',
   name: 'Grey',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello, Lusy!'
};

const catWoman = {
   species: 'cat-woman',
   name: 'Rubby',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying
};

dog.friendly = [man.name, woman.name];
cat.friendly = [woman.name, catWoman.name];
woman.friendly = [man.name, dog.name, cat.name];
man.friendly = [dog.name, woman.name];
catWoman.friendly = [cat.name];

const objectToString = function(obj) {
   const arr1 = [obj.species, obj.name, obj.gender, obj.legs, obj.hands, obj.saying, obj.friendly];
   return arr1.join(";");
}
 
const arr = [dog, cat, woman, man, catWoman];
arr.forEach(element => {
   print(objectToString(element));
});
