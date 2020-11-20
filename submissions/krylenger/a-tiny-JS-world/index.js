/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
    type: "animal",
    legs: 4,
    hands: 0,
    name: "Sharik",
    gender: "male",
    friends: ["Anna", "Eugene"],
    say: () => {
      return "woof woof woof!";
    },
  },
  cat = {
    type: "animal",
    legs: 4,
    hands: 0,
    name: "Murzik",
    gender: "female",
    friends: ["Anna", "Eugene"],
    say: () => {
      return "Mrrrrr...";
    },
  },
  woman = {
    type: "human",
    legs: 2,
    hands: 2,
    name: "Anna",
    gender: "female",
    friends: ["Eugene", "Murzik", "Sharik"],
    say: () => {
      return "Nice to meet you!";
    },
  },
  man = {
    type: "human",
    legs: 2,
    hands: 2,
    name: "Eugene",
    gender: "male",
    friends: ["Anna", "Murzik", "Sharik"],
    say: () => {
      return "Nice to meet you!";
    },
  },
  catWoman = {
    type: "cat-woman",
    legs: 2,
    hands: 2,
    name: "Gerda",
    gender: "female",
    friends: ["Anna", "Murzik"],
    say: cat.say
  };

const inhabitants = [man, woman, cat, dog, catWoman];

const introduction = ({
  type,
  name,
  gender,
  legs,
  hands,
  friends,
  say,
}) => `Hi! My name is <em>${name}</em> and I'm <em>${type}</em>. 
My gender is <em>${gender}</em>. I have <em>${legs}</em> legs and <em>${hands}</em> hands. 
These are my friends: <em>${friends.join(", ")}</em>.<em> 
${say()}</em><br><br>`;

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

//  Print examples:

inhabitants.forEach((inhabitant) => {
  print(introduction(inhabitant), "pre");
});
