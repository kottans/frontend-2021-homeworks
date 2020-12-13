/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/zalevskyi/kottans-frontend/tree/main/practice/a-tiny-js-world
   Web app: https://zalevskyi.github.io/kottans-frontend/practice/a-tiny-js-world/index.html
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Species {
   constructor(genus) {
      this.genus=genus
   }
   descriptionArray() {
      return [`species: ${this.genus}`]
   }
}
class MammalNonMarine extends Species {
   constructor(genus) {
      super(genus)
      this.legs = 4
   }
   descriptionArray() {
      return [...super.descriptionArray(), `legs: ${this.legs}`]
   }
}
class CarnivoraNonMarine extends MammalNonMarine {
   constructor(genus, sound) {
      super(genus)
      this.sound = sound
   }
   descriptionArray() {
      return [...super.descriptionArray(), `sound: ${this.sound}`]
   }
}
class Hominoid extends MammalNonMarine {
   constructor(genus, sound) {
      super(genus)
      this.legs = 2 // overides property value of the prototype
      this.hands = 2
      this.sound = sound
   }
   descriptionArray() {
      //this.legs is not added because it is property of the prototype, just with new value
      return [...super.descriptionArray(), `hands: ${this.hands}`, `sound: ${this.sound}`]
   }
}

/* This World assumption:
 * Individum instances has no variation of properties of their Species
*/

class Individum {
//species parameter should be instance of Species or any of its descendants
   constructor(name, gender, species) {
      this.name=name, this.gender=gender, this.species=species, this.friends = new Set()
   }
   get greeting() {
      if (this.species.genus==='human') return `Hi, my name is ${this.name}`
      else if (this.species.hasOwnProperty('sound')) return this.species.sound
      else return '... (creepy silence)'
   }
   get personality() {
      return [`name: ${this.name}`, `gender: ${this.gender}`].join('; ')
   }
   get biology() {
      return this.species.descriptionArray().filter(d => d.includes('sound')==false).join('; ')
   }
   get friendsList() {
      if (this.friends.size===0) return 'none'
      else return Array.from(this.friends).map(f => `${f.name} (${f.species.genus}, ${f.gender})`).join(', ')
   }
   static becomeFriends(f1, f2) {
      f1.friends.add(f2)
      f2.friends.add(f1)
   }
}
function friendshipIndexPairs(indexUpperBound, probability) {
   const LIST = []
   for (let i=0; i<indexUpperBound; i++) {
      for (let j=i+1; j<indexUpperBound; j++) {
         if (Math.random()<probability) LIST.push([i,j])
      }
   }
   return LIST
}

const HUMAN = new Hominoid('human', 'Bla!')
const CAT = new CarnivoraNonMarine('cat', 'Meow!')
const DOG = new CarnivoraNonMarine('dog', 'Woof!')
const CATWOMAN = new Hominoid('cat-woman', 'Bla!')
const NAMES = [
   {
      species: HUMAN,
      male: ['Liam', 'Noah', 'Oliver', 'William', 'Elijah', 'James', 'Benjamin', 'Lucas', 'Mason', 'Ethan'],
      female: ['Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Evelyn', 'Abigail']
   },
   {
      species: DOG,
      male: ['Charlie', 'Max', 'Buddy', 'Oscar', 'Milo', 'Archie', 'Ollie', 'Toby', 'Jack', 'Teddy'],
      female: ['Bella', 'Molly', 'Coco', 'Ruby', 'Lucy', 'Bailey', 'Daisy', 'Rosie', 'Lola', 'Frankie']
   },
   {
      species: CAT,
      male: ['Oliver', 'Leo', 'Milo', 'Charlie', 'Max', 'Jack', 'Simba', 'Loki', 'Oscar', 'Jasper'],
      female: ['Luna', 'Bella', 'Lily', 'Lucy', 'Kitty', 'Callie', 'Nala', 'Zoe', 'Chloe', 'Sophie']
   },
   {
      species: CATWOMAN,
      male: [],
      female: ['Daisy', 'Stella', 'Cleo']
   }
]
const FRIENDSHIP_PROBABILITY = 0.05
const INHABITANS = []

// ======== INSTANTIATE THE WORLD ========
Object.defineProperty(CATWOMAN, 'sound', {get: () => CAT.sound})
NAMES.forEach(data =>
   ['male','female'].forEach(gender =>
      data[gender].forEach(name =>
         INHABITANS.push(new Individum(name, gender, data.species)))))
friendshipIndexPairs(INHABITANS.length, FRIENDSHIP_PROBABILITY).forEach(pair =>
   Individum.becomeFriends(INHABITANS[pair[0]],INHABITANS[pair[1]]))

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

INHABITANS.forEach(i =>
   print(`<hr>${i.greeting}<br><em>Personality:</em> ${i.personality}
      <br><em>Biology:</em> ${i.biology}<br><em>Friends:</em> ${i.friendsList}`, 'div'))
