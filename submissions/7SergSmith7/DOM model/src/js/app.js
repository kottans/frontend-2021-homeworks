import "../css/vendor/normalize.css";
import "../css/styles.css";

const companiesData = [
  {
    id: "1",
    urlLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png",
    alt: "google-logo",
  },
  {
    id: "2",
    urlLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/%D0%AF%D0%BD%D0%B4%D0%B5%D0%BA%D1%81.svg/1024px-%D0%AF%D0%BD%D0%B4%D0%B5%D0%BA%D1%81.svg.png",
    alt: "yandex-logo",
  },
  {
    id: "3",
    urlLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Microsoft_Bing_logo.svg/1024px-Microsoft_Bing_logo.svg.png",
    alt: "bing-logo",
  },
  {
    id: "4",
    urlLogo: "https://duckduckgo.com/assets/logo_homepage.normal.v108.svg",
    alt: "duckduckgo-logo",
  },
  {
    id: "5",
    urlLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yahoo%21_%282019%29.svg/1024px-Yahoo%21_%282019%29.svg.png",
    alt: "yahoo-logo",
  },
];

const navSide = document.querySelector(".navigation__menu");
const contentContainer = document.querySelector("#content");

navSide.addEventListener("click", onNavBtnClick);

function onNavBtnClick(e) {
  if (e.target.classList.contains("menu__item__btn")) {
    const companyId = e.target.getAttribute("data-id");

    contentContainer.innerHTML = getContentTemplate(companyId);
  }
}

function getContentTemplate(selectId) {
  return `<img class="company_img" src=${
    companiesData[selectId - 1].urlLogo
  } alt="${companiesData[selectId - 1].alt}" data-id="${
    companiesData[selectId - 1].id
  }">`;
}
