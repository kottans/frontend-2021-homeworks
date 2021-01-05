const nav = document.querySelector('nav');

const PLAYERS = [{
    name: "Ronnie O'Sullivan",
    born: "5 December 1975 (age 45) Wordsley, West Midlands, England",
    currentRanking: "3 (as of 21 December 2020)",
    careerWinnings: "£11,776,155",
    picture: "./img/Ronnie O'Sullivan.jpg",
    description: [
      "Ronald Antonio O'Sullivan OBE (born 5 December 1975) is an English professional snooker player from Essex. As a six-time (and reigning) world champion, a record seven-time Masters champion, and a record seven-time UK champion, he is the most successful player in the history of snooker's Triple Crown Series, with a record 20 titles. He also holds the record for the most ranking titles in professional snooker, with 37. His career prize money of over £11.7 million is the most by any player in snooker history.",
      "A noted snooker prodigy from an early age, O'Sullivan made his first competitive century break at age 10, won the British Under-16 Championship at age 13, achieved his first competitive maximum break at age 15, and won the IBSF World Under-21 Snooker Championship before turning professional in 1992, aged 16. He won his first ranking title at the 1993 UK Championship aged 17 born and 358 days, making him the youngest player ever to win a professional ranking event, a record he still holds. He is also the youngest player ever to win the Masters, which he first achieved in 1995, aged 19 born and 69 days. O'Sullivan is now also noted for his longevity in the sport, having competed in a record 28 consecutive World Championships at the Crucible between 1993 and 2020. Winning the 2020 World Championship aged 44 born and 254 days made him the second-oldest player (after Ray Reardon) to win a world title in snooker's modern era.",
      "A prolific break-builder, O'Sullivan is the only player to have achieved 1,000 career century breaks, a milestone he reached in the 2019 Players Championship final. He has also achieved the highest number of officially recognized maximum breaks in professional competition, with 15, and the fastest competitive maximum break, compiled in a time of 5 minutes and 8 seconds at the 1997 World Championship.",
      "Noted for his unpredictable temperament and outspoken views, O'Sullivan has often been at the centre of controversy in the sport. He has received many warnings and sanctions from snooker's governing body over his conduct and comments, and has frequently threatened to retire. Outside his playing career, he has worked as a pundit for Eurosport, has written crime novels and autobiographies, and has starred in the miniseries Ronnie O'Sullivan's American Hustle. He was awarded an OBE in the 2016 New Year Honours.",
      "Known for his fast and attacking style of play, O'Sullivan gained the nickname The Rocket after winning a best-of-nine frame match in a record 43 minutes during his debut season as a professional. A prolific breakbuilder and solid tactical player, he has stated his disdain for long, drawn-out games, saying that they harm the game of snooker. He is right-handed but can play to a high standard with his left hand and routinely alternates where needed, enabling him to attempt shots with his left hand that would otherwise require a rest or spider.[37] When he first displayed this left-handed ability in the 1996 World Championship against Alain Robidoux, the Canadian accused him of disrespect and refused to shake hands after the match."
    ]
  },
  {
    name: "Stephen Hendry",
    born: "13 January 1969 (age 51) South Queensferry, Scotland",
    currentRanking: "	128 (as of 21 December 2020)",
    careerWinnings: "£8.97 million",
    picture: "./img/Stephen Hendry.jpg",
    description: [
      "Stephen Gordon Hendry MBE (born 13 January 1969) is a Scottish professional snooker player and a commentator for the BBC and ITV. As a seven-times World Champion, he is the most successful player in the modern era of the World Snooker Championship and holds the record for the most seasons as world number one (nine seasons). His first world title in 1990, at the age of 21, made him the youngest-ever World Champion, a record that he still holds",
      "Hendry also won six Masters titles (including five consecutively), and five UK Championship titles. His total of 18 Triple Crown tournament wins is surpassed only by Ronnie O'Sullivan's 20. One of only three players to have won all three Triple Crown events in a single season, Hendry is the only player to have achieved the feat twice, in the 1989–90 and 1995–96 seasons. He has the second-highest total of ranking titles (36) behind O'Sullivan. A prolific break builder, Hendry has recorded a total of 775 career century breaks, and made 11 officially recognised maximum breaks in professional competition.",
      "He was awarded an MBE in 1994, and voted BBC Scotland's Sports Personality of the Year in 1987 and 1996. In May 2012, after featuring in his 27th consecutive World Championship, he announced his retirement from the game, bringing to an end his record 23 consecutive seasons in the top 16 of the world rankings. Hendry’s retirement was in response to his game being severely impacted by ‘yips’, which first began 12 years prior to his retirement.",
      "In September 2020, it was announced that Hendry would come out of retirement after having been given an invitational tour card for the next two seasons."
    ]
  },
  {
    name: "Mark Selby",
    born: "19 June 1983 (age 37) Leicester, England",
    currentRanking: "4 (as of 21 December 2020)",
    careerWinnings: "£5,907,434",
    picture: "./img/Mark Selby.jpeg",
    description: [
      "Mark Selby (born 19 June 1983) is an English professional snooker player and three-time World Snooker Champion. He has won 19 ranking titles, placing him joint seventh (with Neil Robertson) on the all-time list of ranking tournament wins. He has held the world number one position six times, having first topped the snooker world rankings in September 2011, and was ranked world number one for more than four years continuously between February 2015 and March 2019.",
      "Selby joined the main professional snooker tour in 1999 at the age of 16, after winning the England under-15 championship in 1998. He was runner-up to John Higgins at the 2007 World Snooker Championship, and has since won all of snooker's Triple Crown events at least twice, having won three Masters titles (2008, 2010, and 2013), two UK Championships (2012 and 2016), and three World Championships (2014, 2016, and 2017). He has also won the Welsh Open, the Shanghai Masters, the German Masters, the China Open (three times), the Paul Hunter Classic, the International Championship (twice), the China Championship, the European Masters, and three of the four Home Nations Series events.",
      "A prolific break-builder, Selby has compiled more than 600 century breaks in his professional career. His nickname, (The Jester from Leicester), was given to him by snooker compere Richard Beare. Selby is also a pool player; he was the 2006 World Eight-ball Pool Federation champion and runner-up at the Chinese Eight-ball World Championship in 2015.",
      "Selby was born in Leicester, England, on 19 June 1983. He began playing pool at the age of eight and snooker aged nine.[4] Malcolm Thorne, the brother of Leicester-born snooker player Willie Thorne, spotted Selby's snooker ability and offered him free practice at his brother's snooker club, which Selby took full advantage of, practising in the evenings after school. When Selby was 16, his father David died of cancer. Two months later, Selby joined the main professional tour, having left school with no qualifications."
    ]
  },
  {
    name: "Ding Junhui",
    born: "1 April 1987 (age 33) Yixing, Jiangsu, China",
    currentRanking: "9 (as of 21 December 2020)",
    careerWinnings: "£3,600,854",
    picture: "./img/Ding Junhui.jpg",
    description: [
      "Ding Junhui (Chinese: 丁俊晖; born 1 April 1987) is a Chinese professional snooker player who has been considered the most successful Asian player in the history of the sport. Throughout his career, he has won 14 major ranking titles, including three UK Championships in 2005, 2009, and 2019; two Shanghai Masters titles in 2013 and 2016; and one German Masters title in 2014. He has also twice reached the final of the Masters, winning once in 2011. Representing China at the Asian Games, Ding has won five gold medals in individual and team events. In 2016, he became the first Asian player to reach the final of the World Championship. The same year, he won his first Six-red World Championship.",
      "Ding began playing snooker at age nine and rose to international prominence in 2002 after winning the Asian Under-21 Championship and the Asian Championship. At age 15, he became the youngest winner of the IBSF World Under-21 Championship. In 2003, Ding turned professional at the age of 16. His first major professional successes came in 2005 when he won the China Open and the UK Championship, becoming the first player from outside Great Britain and Ireland to win the title.",
      "During his career, Ding—who is known as a prolific break-builder—has compiled more than 550 century breaks, including six maximum breaks, in professional play. He was the first and only Asian player to be ranked world number one, which he first achieved in 2014 to become the 11th player to reach the top spot. Aside from snooker, Ding enrolled at Shanghai Jiao Tong University in 2006 to study Business Administration and Management. He is a long-time resident of Sheffield, England, and practices at the English Institute of Sport.",
    ]
  },
  {
    name: "John Higgins",
    born: "	18 May 1975 (age 45) Wishaw, North Lanarkshire, Scotland",
    currentRanking: "6 (as of 21 December 2020)",
    careerWinnings: "£9,170,578",
    picture: "./img/John Higgins.jpg",
    description: [
      "John Higgins, MBE (born 18 May 1975) is a Scottish professional snooker player. Since turning professional in 1992, he has won 30 ranking titles, including four World Championships and three UK Championships, as well as two Masters titles.",
      "In terms of world titles in the modern era, Higgins is fifth behind Stephen Hendry (7), Steve Davis (6), Ray Reardon (6) and Ronnie O'Sullivan (6). His 30 career ranking titles puts him in third place behind Hendry (36) and O'Sullivan (37). Known as a prolific break-builder, he has compiled over 800 century breaks in professional tournaments, second only to O'Sullivan. He has also compiled 11 competitive maximum breaks tied with Hendry (11), placing him second behind O'Sullivan (15). Higgins has been world number 1 on four occasions.",
      "In 2010, the News of the World tabloid newspaper carried out a sting operation in a hotel room in Ukraine, which claimed to show Higgins and his then-manager arranging to lose specific frames in future matches for money. Although an investigation cleared Higgins of match-fixing allegations, it found that he had brought the sport into disrepute by failing to report, and giving the impression of agreeing with, an invitation to breach the sport's betting rules. The WPBSA banned Higgins from professional competition for six months and fined him £75,000. He returned to the tour midway through the 2010–11 season.",
      "Higgins added a third UK Championship title in 2010 and claimed his fourth world title in 2011. He then experienced a slump in form, and between 2012 and 2014 only won the 2012 Shanghai Masters. He spoke frequently in this period about his struggles with confidence and consistency. However, in 2015, Higgins returned to winning ways, capturing three ranking titles. He reached three consecutive World Championship finals between 2017 and 2019, but lost to Mark Selby in 2017, to Mark Williams in 2018, and to Judd Trump in 2019."
    ]
  },
  {
    name: "Judd Trump",
    born: "	20 August 1989 (age 31) Whitchurch, Bristol, England",
    currentRanking: "1 (as of 21 December 2020)",
    careerWinnings: "£5,256,254",
    picture: "./img/Judd Trump.jpg",
    description: [
      "Judd Trump (born 20 August 1989) is an English professional snooker player from Bristol. A former world champion and the current world number one, he has won a career total of 20 ranking titles. He is one of 11 players to have won a career Triple Crown.",
      "Trump turned professional in 2005, aged 16. He had a breakthrough year in 2011 when he captured his first ranking title at the 2011 China Open, reached the final of the 2011 World Championship (losing 15–18 to John Higgins), and claimed his first Triple Crown title by winning the 2011 UK Championship, defeating Mark Allen 10–8 in the final.",
      "In the 2018–19 snooker season, he won his first Masters, defeating Ronnie O'Sullivan 10–4 in the final, and completed his Triple Crown by claiming his first world title at the 2019 World Snooker Championship, defeating Higgins 18–9. In doing so, he became the first player to win over £1 million in prize money in a single season. In the 2019–20 snooker season, he won six ranking tournaments, setting a new record for the most ranking titles in one season.",
      "A prolific break-builder, Trump has compiled more than 750 century breaks in professional competition, making him the fourth player ever to reach the 750-century mark. In the 2019–20 season, he became the second player after Neil Robertson to compile 100 century breaks in a single season. Trump finished the season on 102 centuries, one fewer than Robertson's record 103."
    ]
  },
  {
    name: "Neil Robertson",
    born: "11 February 1982 (age 38) Melbourne, Victoria, Australia",
    currentRanking: "2 (as of 21 December 2020)",
    careerWinnings: "£5,318,112",
    picture: "./img/Neil Robertson.jpg",
    description: [
      "Neil Robertson (born 11 February 1982) is an Australian professional snooker player. He made his first breakthrough into the top professional ranks in the 2006–07 season. He won the 2010 World Championship and was the world number one later in the same year, a ranking that he attained again in 2013 and 2014. On 10 November, Neil Robertson won the 2019 Champion of Champions tournament for the second time in his career and secured his 19th ranking event.",
      "Robertson is the only Australian to have won a ranking event, and was undefeated in his first six televised finals. Robertson is also one of thirteen players to win both the world and UK titles, and one of eleven to win the Triple Crown of World Championship, UK Championship and Masters. As a prolific break-builder, Robertson has compiled more than 750 century breaks in professional competition. During the 2013–14 season he became the first player to make 100 centuries in a single season.",
      "Robertson is the most successful player from outside the United Kingdom in the sport's history. He plays left-handed.",
      "In June 2016, he became ambassador of electronic snooker simulator app Snooker Live Pro. He was an avid gamer but gave up the hobby in April 2017, believing he was spending too much time playing games and it was affecting his snooker form."
    ]
  },
]

const playerPhoto = document.querySelector('.photo');
const playerName = document.querySelector('.player-name');
const playerBorn = document.querySelector('.born');
const playerCurrentRanking = document.querySelector('.current-ranking');
const playerCareerWinnings = document.querySelector('.career-winnings');
const playerDescription = document.querySelector('.description');


let currentPlayerIndex = 0;

const toggleActiveLink = (newActiveEl) => {
  document.querySelector('.active').classList.toggle('active');
  newActiveEl.classList.toggle('active');
}

const generatePlayerDescription = (id) => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  PLAYERS[id].description.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item;
    fragment.appendChild(p);
  });


  div.appendChild(fragment);
  return div.innerHTML;
}

const displayContent = (activeElem) => {
  const data = PLAYERS[activeElem.id];
  playerPhoto.setAttribute('src', data.picture);
  playerName.textContent = data.name;
  playerBorn.textContent = data.born;
  playerCurrentRanking.textContent = data.currentRanking;
  playerCareerWinnings.textContent = data.careerWinnings;
}


const displayMain = ({
  target
}) => {
  if (target.id === currentPlayerIndex) return;
  currentPlayerIndex = target.id;

  displayContent(target);

  toggleActiveLink(target);

  playerDescription.innerHTML = generatePlayerDescription(target.id);

  document.querySelector('#menuGamburger').checked = false;
}

nav.addEventListener("click", displayMain);
