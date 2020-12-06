/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/BlueLamantine/a-tiny-JS-world
   Web app: https://bluelamantine.github.io//a-tiny-JS-world/
   */
class General {

   constructor(props) {
      this.name = props.name;
      this.friends = Array.isArray(props.friends) ? props.friends : 'no friends';
   }

}

class Human extends General {

   constructor(props) {
      super(props);
      this.species = 'human'
      this.legs = 2;
      this.hands = 2;
   };
   
   static getGender = {
      male : ['He', 'his'],
      female : ['She', 'her']
   };

   getInfo() {
      return `This ${this.species} is a ${this.gender}, ${Human.getGender[this.gender][1]} name is ${this.name}. ${Human.getGender[this.gender][0]} has ${this.legs} legs and ${this.hands} hands. ${Human.getGender[this.gender][0]} says \'${this.voise}\'. Friend with : ${this.friends}`;
   }


}

class Man extends Human {

   constructor(props) {
      super(props);
      this.gender = 'male';
      this.voise = 'What a wonderful world!';
   }
   
}

class Woman extends Human {

   constructor(props){
      super(props);
      this.gender = 'female';
      this.voise = 'Feminism is in the air!';
   }

}

class Pet extends General {

   constructor(props) {
      super(props);
      this.paws = 4;
   }

   getInfo() {
      return `This ${this.species} is a ${this.gender}, its name is ${this.name}. The ${this.species} has ${this.paws} paws. Makes a sound \'${this.sound}\'. Social with : ${this.friends}`;
   }

}

class Cat extends Pet {

   constructor(props) {
      super(props);
      this.species = 'cat';
      this.gender = props.gender;
      this.sound = 'Meow Purrrr Purrr';
   }

}

class Dog extends Pet {

   constructor(props) {
     super(props);
     this.species = 'dog';
     this.gender = props.gender;
     this.sound = 'Woof woof';
   }

 }

class CatWoman extends Woman {

   constructor(props) {
      super(props);
      this.species = 'cat-woman';
      this.voise = cat.sound;
      this.friends = props.friends;
   }

}

const woman = new Woman({ name: 'Eva', friends: ['Garfield', 'Jack'] });

const cat = new Cat({ name: 'Garfield', gender: 'male' });

const catWoman = new CatWoman(
   Object.assign(this, new Cat({
      name: 'Mary',
      gender: 'female',
      friends : ['Eva', 'Garfield']
    }) )
);

const dog = new Dog({
  name: 'Hachiko',
  gender: 'male',
  friends: ['Eva', 'Jack']
});

const man = new Man({ name: 'Jack', friends: ['Hachiko', 'Eva'] });

[man, woman, cat, dog, catWoman].map(el => print(el.getInfo(), 'p'));;

