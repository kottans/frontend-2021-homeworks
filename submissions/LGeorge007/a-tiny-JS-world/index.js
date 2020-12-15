 /* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/LGeorge007/a-tiny-JS-world

   Web app: https://lgeorge007.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: "dog",
   name: "Vasiliy",
   legs: 4,
   hands: 0,
   gender: "male",
   friends: ["Bublik", "Beem"],
   saying: "Woof woof!"
};

const cat = {
   species: "cat",
   name: "Murkka",
   legs: 4,
   hands: 0,
   gender: "female",
   friends: ["Barsik", "Murzik", "Felix"],
   saying: "Meow meow!"
};

const woman = {
   species: "human",
   name: "Larisa",
   legs: 2,
   hands: 2,
   gender: "female",
   friends: ["Irina", "Vlad", "Marina"],
   saying: "Hi!"
};

const catWoman = {
   species: "superhero human",
   name: "Cat woman",
   legs: 2,
   hands: 2,
   gender: "female",
   friends: ["Batman", "all cats in the world"],
   saying: cat.saying
};

const man = {
   species: "human",
   name: "Boris",
   legs: 2,
   hands: 2,
   gender: "male",
   friends: ["Vladimir", "Mariya", "Oksana"],
   saying: "Hello!"
};

const message = function(inhabitant) {
   
   const {species, name, gender, hands, legs, friends, saying} = inhabitant;
   
   return [
      `${saying}`,
      `I'm a ${species}`,
      `My name is ${name}`,
      `My gender is ${gender}`,
       hands 
        ? `${hands} hands and ${legs} legs`
        : `${legs} paws`,
      `Also I have a friends: ${friends.join(", ")}`
      ].join('. ');
};

const inhabitants = [dog, cat, man, woman, catWoman];

// ======== OUTPUT ========
/* Use print(message) for output.*/
print("Print created objects","h1");

inhabitants.forEach(el => print(message(el), "p"));
