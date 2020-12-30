const memes = [
    {
        title: "Awkward half-cat",
        about: "This meme began with a photoshop battle in Reddit. On May 12, 2016, a user with the nickname catcatdogcat posted a photo of a cat and invited users to take pictures with him.",
        img: "img/Awkward half-cat.jpg",
    },
    {
        title: "Loading cat",
        about: "Loading Cat or Buffering Cat refers to an image macro of a calico cat expressing anger or confusion and a buffering icon superimposed over its forehead. In August 2017, the image gained popularity as a reaction meme among Russian users on VK and other online platforms and gained mainstream popularity on Reddit in December 2019. The origin of the unedited image and the buffering edit are unknown. On September 9th, 2018, Yaplakal user gary56 posted the earliest available unedited version of the photograph (shown below, left). Before that, in July 2017, the first known meme based on the buffering edit was posted online (shown below, right), with the image being included in several meme dump posts starting on July 18th.",
        img: "img/loading-cat.jpg"
    },
    {
        title: "Ceiling cat",
        about: "Ceiling Cat is a photoshop meme based on a photograph of a cat peeking through a hole in the ceiling of a room. Its online popularity eventually led to several derivative characters, including his nemesis Basement Cat and Basement Horse. While the original photographer of the image is still unknown, several people have claimed to know its origin. Encyclopedia Dramatica states that the cat belongs to Wikipedia user Samguana but this claim has not been confirmed. In May 2012, Something Awful poster Quarex claimed that they were friends with the cat's owner, posting a similar photo of the cat from a different angle. The user also said the cat in the photo passed away in 2010.",
        img: "img/ceiling-cat.jpg"
    },
    {
        title: "Longcat",
        about: "Longcat is one of the most recognized cats on the Internet. He is known for his epic length, spawning photoshops and even an entire mythology around his magnitude. The original photo of Longcat, whose name is Shiroi or Nobiko, first appeared on Futaba channel (2chan) sometime between 2004 and 2005 by a man from Japan. On 2chan, she was referred to as \"nobiiru\", which means \"stretch.\" Variations of this included \"nobiiru-tan,\" which was attributed to 2chan's /27/ board as early as February 2nd, 2006.",
        img: "img/longcat.jpg"
    },
    {
        title: "Grumpy Cat",
        about: "Grumpy Cat is the nickname given to Tardar Sauce, a snowshoe cat that rose to online fame after several pictures of her annoyed facial expressions were posted to Reddit in late September 2012. Grumpy Cat was born in Morristown, Arizona on April 4th, 2012 to her owner Tabatha Bundesen. The original photos of Grumpy Cat were posted to the /r/pics subreddit by Bundesen's brother Bryan on September 23rd, 2012 (shown below).",
        img: "img/grumpy-cat.jpg"
    },
    {
        title: "Crying Cat",
        about: "Crying Cat, also known as Schmuserkadser, refers to a series of photoshopped images of cats with teary, glassy eyes to appear as though they are sad. The earliest known usage of the Crying Cat was published by an anonymous Meme Generator user on June 11th, 2014 (shown below, left). The image is a photoshopped version of Serious Cat, due to the fact that the background of the image and ears and color of the cat are identical (shown below, right). Within four years, the image has generated more than 925 images.",
        img: "img/crying-cat.jpg"
    },
    {
        title: "Whoosh",
        about: "Whoosht, known in Russia as вжух, is an image of a cat crudely dressed as a wizard that casts unfortunate spells. It grew popular on Russian websites such as Numl in December of 2016. The image of the cat is taken from a post on justcuteanimals.com (shown below, left). It later gained some traction as \"Wizard Cat\" on me_irl following a post from April 2016 that referred to it as the High Wizard Cat (shown below, right).",
        img: "img/whoosh-cat.jpg"
    }
]

const nav_ul = document.querySelector(".nav_ul");
const aside = document.querySelector("aside");
const main = document.querySelector("main");
const openbtn = document.querySelector(".nav-open-button");
let navButtonListArray;

function createNavButtons() {
    const navButtonList = document.createDocumentFragment();

    nav_ul.innerHTML = "";
    memes.forEach(function (element) {
        const navLi = document.createElement("li");
        const navButtonItem = document.createElement("button");
        navButtonItem.classList.add("nav-button");
        navButtonItem.innerHTML = element.title;
        navLi.append(navButtonItem);
        navButtonList.append(navLi);
    });
    nav_ul.append(navButtonList);
    navButtonListArray = Array.from(document.querySelectorAll(".nav-button"));
}

function displayMain({ target }) {
    if (target.classList.contains('nav-button')) {
        highlightSelectedItem(target);
    }
    const selectedButtonIndex = navButtonListArray.indexOf(target);
    main.innerHTML = "";
    const memeInfo = document.createDocumentFragment();
    let memeInfoitem;

    const memeInfoTitle = document.createElement("div");
    memeInfoTitle.classList.add("mainItem-title");
    memeInfoTitle.innerHTML = memes[selectedButtonIndex].title;
    memeInfo.append(memeInfoTitle);
    const memeInfoImage = document.createElement("img");
    memeInfoImage.classList.add("mainItem-image");
    memeInfoImage.src = memes[selectedButtonIndex].img;
    memeInfo.append(memeInfoImage);
    const memeInfoAbout = document.createElement("div");
    memeInfoAbout.classList.add("mainItem-about");
    memeInfoAbout.innerHTML = "About:<br>" + memes[selectedButtonIndex].about;
    memeInfo.append(memeInfoAbout);
    main.append(memeInfo);
}
function hideMenu(target) {
    aside.classList.toggle('hidden');
}

function highlightSelectedItem(target) {
    if (document.querySelector('.nav-button.highlight') !== null)
        document.querySelector('.nav-button.highlight').classList.remove('highlight');
    target.classList.add('highlight');
}

createNavButtons();
nav_ul.addEventListener("click", displayMain);
openbtn.addEventListener("click", hideMenu)
