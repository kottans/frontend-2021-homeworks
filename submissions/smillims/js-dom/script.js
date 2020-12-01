const heroes = [
	{
		id: 1,
		name: "Geralt",
		years: 57,
		description: `Geralt of Rivia was a legendary witcher of the School of the Wolf active throughout the 13th century. He loved the sorceress Yennefer, considered the love of his life despite their tumultuous relationship, and became Ciri's adoptive father.`
	},
	{
		id: 2,
		name: "Ciri",
		years: 20,
		description: `Ciri. Also known as the Child of Destiny, Ciri is described generally as a weapon that has the potential to destroy the very world that she inhabits. Along with this there are ties to her being an apprentice to Geralt. Her Witcher training, coupled with the magical abilities, mark her as one of the most powerful individuals in the world.`
	},
	{	
		id: 3,
		name: "Triss",
		years: 37,
		description: `Triss Merigold of Maribor is a legendary Temerian sorceress of the 13th century. A member of King Foltest's royal council along with Fercart and Keira Metz, as well as a founding member of the Lodge of Sorceresses, she was involved in politics for most of her life. `
	},
	{	
		id: 4,
		name: "Yennefer",
		years: 99,
		description: `Yennefer of Vengerberg, born on Belleteyn in 1173, was a sorceress who lived in Vengerberg, the capital city of Aedirn. She was Geralt of Rivia's true love and a mother figure to Ciri, whom she viewed like a daughter to the point that she did everything she could to rescue the girl and keep her from harm.`
	}
]

const nav = document.querySelector('.navbar');
const ul = document.querySelector('.list');
const container = document.querySelector('.container');

const createNavItem = () => {
	ul.innerHTML = heroes.map(({id, name}) => (
		`<li class='list-item'>
			<a data-id="${id}" class="list-link" href="#">${name}</a>
		</li>`
	)).join('')
}

function displayFact(navLink) {
	const hero = heroes.find((el) => navLink.dataset.id == el.id)
 	if (!hero) {
 		return hero = '';
	 }
	const newDiv = document.createElement('div');
	newDiv.classList.add('content-text');
	newDiv.innerText = hero.description;
	container.innerHTML = '';
	container.append(newDiv);
};


document.addEventListener("DOMContentLoaded", function(el) {
	createNavItem();
	ul.addEventListener('click', function(el) {
	  let target = el.target;
	  el.preventDefault();
	  const navItemActive = document.querySelector('.list-item.active');
	  if (navItemActive) {
		 navItemActive.classList.remove('active');
	  }
	  target.closest('.list').classList.add('active');
	  displayFact(target);
	});
});
