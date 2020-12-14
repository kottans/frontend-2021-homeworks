/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/zalevskyi/kottans-frontend/tree/main/practice/a-tiny-js-world
   Web app: https://zalevskyi.github.io/kottans-frontend/practice/a-tiny-js-world/index.html
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const being = {species: undefined, name: undefined, gender: undefined, legs: undefined, hands: undefined, saying: undefined}
const human = Object.assign({}, being, {species: 'human', legs: 2, hands: 2, saying: 'Bla!'})
const cat_woman = Object.assign({}, human, {species: 'cat-woman', saying: 'Meow'})
const pet = Object.assign({}, being, {legs: 4, hands: 0})
const dog = Object.assign({}, pet, {species: 'dog', saying: 'Woof!'})
const cat = Object.assign({}, pet, {species: 'cat', saying: 'Meow'})
const species = {human: human, dog: dog, cat: cat, cat_woman: cat_woman}
const names = {
   human: {
      male: ['Liam', 'Noah', 'Oliver', 'William', 'Elijah', 'James', 'Benjamin', 'Lucas', 'Mason', 'Ethan'],
      female: ['Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Evelyn', 'Abigail']
   },
   dog: {
      male: ['Charlie', 'Max', 'Buddy', 'Oscar', 'Milo', 'Archie', 'Ollie', 'Toby', 'Jack', 'Teddy'],
      female: ['Bella', 'Molly', 'Coco', 'Ruby', 'Lucy', 'Bailey', 'Daisy', 'Rosie', 'Lola', 'Frankie']
   },
   cat: {
      male: ['Oliver', 'Leo', 'Milo', 'Charlie', 'Max', 'Jack', 'Simba', 'Loki', 'Oscar', 'Jasper'],
      female: ['Luna', 'Bella', 'Lily', 'Lucy', 'Kitty', 'Callie', 'Nala', 'Zoe', 'Chloe', 'Sophie']
   },
   cat_woman: {
      female: ['Daisy', 'Stella', 'Cleo']
   }
}
function inhabitWorld(species, names) {
   let inhabitans = []
   for (let kind in names) {
      for (let gender in names[kind]) {
         inhabitans.push(...names[kind][gender].map(name => Object.assign({},species[kind],{gender: gender, name: name})))
      }
   }
   return inhabitans
}
function learnToTalk(inhabitans) {
   inhabitans.forEach((obj, index, arr) => {
      if (obj.species==='human') Object.defineProperty(arr[index], 'saying', {get: () => `Hi! I'm ${obj.name}`})
      if (obj.species==='cat-woman') Object.defineProperty(arr[index], 'saying', {get: () => cat.saying})
   })
}
function makeFriends(inhabitans, maxFriends) {
   inhabitans.forEach((obj, index, arr) => {
      const myFriendsSet = new Set()
      const myFriendsNumber = Math.floor(Math.random()*Math.min(maxFriends, arr.length))
      while (myFriendsSet.size < myFriendsNumber) {
         let nextFriend = arr[Math.floor(Math.random()*(arr.length-1))]
         if (obj !== nextFriend) {
            myFriendsSet.add(nextFriend)
         }
      }
      arr[index].friends=myFriendsSet
   })
}
const inhabitans = inhabitWorld(species, names)
learnToTalk(inhabitans)
makeFriends(inhabitans, 5)
cat.saying='Catch me! Meow!'

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
inhabitans.forEach((being) => {
   print(`${Object.values(being).slice(0,-1).join('; ')}; ${Array.from(being.friends).map(friend => friend.name).join(', ')}`,'div')
})
