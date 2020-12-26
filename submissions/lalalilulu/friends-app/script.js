document.addEventListener("DOMContentLoaded", () => {
    fetchContent().then((response) => startApp(response.results));
})

const startApp = (response) => {
    renderContent(response);
    const friendsArray = response;

    document.getElementById("search").addEventListener("keyup", ({target}) => {
        renderContent(searchByName(friendsArray, target.value));
    });

    document.getElementById("name-ascending").addEventListener("change", () => {
        renderContent(sortByNameAscending(friendsArray));
    });

    document.getElementById("name-descending").addEventListener("change", () => {
        renderContent(sortByNameDescending(friendsArray));
    });

    document.getElementById("age-ascending").addEventListener("change", () => {
        renderContent(sortByAgeAscending(friendsArray));
    });

    document.getElementById("age-descending").addEventListener("change", () => {
        renderContent(sortByAgeDescending(friendsArray));
    });

    document.getElementById("female").addEventListener("change", () => {
        renderContent(sortByGenderFemale(friendsArray));
    });

    document.getElementById("male").addEventListener("change", () => {
        renderContent(sortByGenderMale(friendsArray));
    });

    document.getElementById("all").addEventListener("change", () => {
        renderContent(friendsArray);
    });
}

const fetchContent = function() {
    const jsonHeader = {dataType: "json"};
    return fetch('https://randomuser.me/api/?inc=name,gender,phone,picture,dob&results=24', jsonHeader).then(response => response.json());
}

const createPersonCard = (friend) => {
    console.log(friend);
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML =
                `<div class="card-img">
                    <img src="${friend.picture.medium}" alt="friend-photo">
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <p>${friend.name.first} ${friend.name.last}</p>
                    </div>
                     <div class="card-info">
                        <p>Age: ${friend.dob.age}</p>
                        <p>Phone: ${friend.phone}</p>
                    </div>
                    <div class="card-footer">
                        <p>${friend.gender}</p>
                    </div>
                </div>`;
    card.querySelector(".card-img").classList.add(friend.gender === "male" ? "card-blue" : "card-pink");
    return card;
}

const renderContent = (friends) => {
    const content = document.getElementById("content");
    content.textContent = "";
    let fragment = document.createDocumentFragment();
    friends.forEach(friend => fragment.append(createPersonCard(friend)));
    content.append(fragment);
}

const searchByName = (array, value) => {
    return array.filter(friend => {
        const firstLastName = `${friend.name.first} ${friend.name.last}`;
        return firstLastName.includes(value);
    })
}

const sortByNameAscending = (array) => {
    return array.sort((prev, next) => {
        if (prev.name.first < next.name.first) return -1;
        if (prev.name.first > next.name.first) return 1;
        if (prev.name.first === next.name.first) return 0;
    });
}

const sortByNameDescending = (array) => {
    return array.sort((prev, next) => {
        if (prev.name.first < next.name.first) return 1;
        if (prev.name.first > next.name.first) return -1;
        if (prev.name.first === next.name.first) return 0;
    });
}

const sortByAgeAscending = (array) => {
    return array.sort((prev, next) => prev.dob.age - next.dob.age);
}

const sortByAgeDescending = (array) => {
    return array.sort((prev, next) => next.dob.age - prev.dob.age);
}

const sortByGenderMale = (array) => {
    return array.filter(friend => friend.gender === "male");
}

const sortByGenderFemale = (array) => {
    return array.filter(friend => friend.gender === "female");
}
