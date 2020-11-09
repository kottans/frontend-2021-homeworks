const facts = [
  {
    id: 1,
    navName: 'Fact number 1',
    title: 'Feminists don’t hate you',
    text: 'Not all feminists hate men and not all men are feminists. We are not out to get you and we don’t want your jobs. We just simply want to live our lives without the fear of being sexually assaulted. We want to be able to do the jobs we love with fair pay. We want to live in a world where are no longer seen as objects but as humans in its place. Speaking for most women out there, men are magic, mysterious, and intelligent human beings who have captivated the souls and hearts of women and have made our bodies sing.'
  },
  {
    id: 2,
    navName: 'Fact number 2',
    title: 'Feminism is not just about females or women',
    text: 'Interesting fact about women: Feminism is defined as a person who strongly believes in the political, social, and economic fairness of the sexes. Nowhere in this definition does it say that you need to be a female. If you think your mother, sister, daughter or girlfriend should have the same rights as you do then consider yourself a feminist. This is a feminist fact! '
  },
  {
    id: 3,
    navName: 'Fact number 3',
    title: 'If you are a feminist, it doesn’t make you less of a man ',
    text: 'This is an interesting fact about women: Many women are guilty of holding men to stereotypes which is just as bad as the ones they hold us to. Though men are not victims of many years of gender domination, men are definitely struggling with this too. When men no longer feel the need to prove superiority with their physicality, women will no longer feel the need to prove their passiveness. As women who see themselves as less of a man because you show them respect have no self-respect for themselves. Those men who don’t agree with your appreciation of the female sex more than likely spend most of their time demeaning women than sleeping with them.'
  },
  {
    id: 4,
    navName: 'Fact number 4',
    title: 'Calling yourself a feminist opens doors',
    text: 'Women love feminism. By openly admitting you’re a feminist to your woman shows that you respect her just as much as you respect yourself. Whether you are an interesting or uninteresting man on the planet, if you stand behind feminism you will be awesome and more approachable! Feminism fact.'
  },
  {
    id: 5,
    navName: 'Fact number 5',
    title: 'There is nothing that you need to do except think',
    text: 'No one has the right to tell you what type of feminism you need to be. One of the first steps to feminism is changing the way you think about women in general. Try to picture having a wife with a full-time job and lastly, ask a woman if she wants to be touched by you instead of just doing it.'
    }
];

const navList = document.querySelector('.navigation__list');
const container = document.querySelector('.container');

const paragraph = document.createElement('p');
const title = document.createElement('h2');

const asideBtn = document.querySelector('.aside-btn');
const navigation = document.querySelector('.navigation');

function generateText(){
  title.classList.add('title-content');
  paragraph.classList.add('content');
  const startContent = 'Feminism is usually misunderstood and is viewed as a man-hating movement But it’s really quite the opposite! Feminism is about establishing equality between both men and women. Many women throughout history have undergone severe sexist laws thus the initiation of feminism movement was created to end discrimination. From eradicating female genital disfigurement to setting “girl power” in the 90’s. Relentless, stimulating, lively, serious, provocative, and above all empowering.';
  paragraph.textContent = startContent;
  container.append(paragraph);
};

function createNavItem() {
  facts.forEach(function(fact) {
    const navItem = document.createElement('li');
    navItem.classList.add('navigation__list-item');
    navItem.innerHTML = `<a data-id="${fact.id}" class="navigation__list-link" href="#">${fact.navName}</a>`;
    navList.append(navItem);
  })
};

function displayFact(navLink) {
  facts.find(function(fact) {
    if (navLink.dataset.id == fact.id) {
        title.innerText = fact.title;
        paragraph.innerText = fact.text;
        container.append(title);
        container.append(paragraph);
      }
  }) 
};

navList.addEventListener('click', function(e) {
  let target = event.target;
  e.preventDefault();
  const navItemActive = document.querySelector('.navigation__list-item.active');
  if (navItemActive) {
    navItemActive.classList.remove('active');
  }
  target.parentNode.classList.add('active');
  displayFact(target);
});

generateText();
createNavItem();

asideBtn.addEventListener('click', function(e) {
  asideBtn.classList.toggle('clicked');
  navigation.classList.toggle('visible');
})
