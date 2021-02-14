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
        name: "Fred",
        gender: "male",
        friends: ["Adele", "Arnold"],
        say: () => {
            return "Woof!";
        },
    },
    cat = {
        type: "animal",
        legs: 4,
        hands: 0,
        name: "Luna",
        gender: "female",
        friends: ["Adele", "Arnold"],
        say: () => {
            return "Meow!";
        },
    },
    woman = {
        type: "human",
        legs: 2,
        hands: 2,
        name: "Adele",
        gender: "female",
        friends: ["Arnold", "Luna", "Fred"],
        say: () => {
            return "Hey there!";
        },
    },
    man = {
        type: "human",
        legs: 2,
        hands: 2,
        name: "Arnold",
        gender: "male",
        friends: ["Adele", "Luna", "Fred"],
        say: () => {
            return "Hello world!";
        },
    },
    catWoman = {
        type: "cat-woman",
        legs: 2,
        hands: 2,
        name: "Bella",
        gender: "female",
        friends: ["Adele", "Luna"],
        say: cat.say
    };

const residents = [man, woman, cat, dog, catWoman];

const presentation = ({
                          type,
                          legs,
                          hands,
                          name,
                          gender,
                          friends,
                          say,
                      }) => `Hello! My name is ${name}, I'm ${type}. 
I am ${gender}. I have ${legs} legs and ${hands} hands. 
These are my friends: ${friends.join(", ")}. 
${say()}`;

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

residents.forEach((resident) => {
    print(presentation(resident), "pre");
});
