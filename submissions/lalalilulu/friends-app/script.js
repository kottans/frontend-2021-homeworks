document.addEventListener("DOMContentLoaded", () => {
    fetchContent().then((response) => startApp(response.results)).catch(error => console.log(error.message));
})

const startApp = (response) => {
    renderContent(response);
    const friendsArray = response;

    document.getElementById("search").addEventListener("keyup", ({target}) => {
        renderContent(searchByValue(friendsArray, target.value));
    });

    document.querySelector(".filter-items").addEventListener("change", ({target}) => {
        let sortedArray = [];
        switch (target.id) {
            case "name-ascending":
                sortedArray = sortByName(friendsArray, true);
                break;
            case "name-descending":
                sortedArray = sortByName(friendsArray, false);
                break;
            case "age-ascending":
                sortedArray = sortByAge(friendsArray, true);
                break;
            case "age-descending":
                sortedArray = sortByAge(friendsArray, false);
                break;
            case "female":
                sortedArray = sortByGender(friendsArray, "female");
                break;
            case "male":
                sortedArray = sortByGender(friendsArray, "male");
                break;
            case "all":
                sortedArray = sortByGender(friendsArray, null);
                break;
        }
        renderContent(sortedArray);
    });
}

const fetchContent = function() {
    const jsonHeader = {dataType: "json"};
    return fetch('https://randomuser.me/api/?inc=name,gender,phone,picture,dob&results=24', jsonHeader)
        .then(response => response.json())
        .catch(error => console.log(error.message));
}

const createPersonCard = (friend) => {
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

const searchByValue = (array, value) => {
    let sortedArray = [...array];
    if(document.getElementById("female").checked) {
         sortedArray = sortByGender(array, "female");
    } else if(document.getElementById("male").checked) {
        sortedArray = sortByGender(array, "male");
    }
    return sortedArray.filter(friend => {
        const firstLastName = `${friend.name.first} ${friend.name.last}`;
        return firstLastName.includes(value);
    })
}

const sortByName = (array, isAscending) => {
    const sortedArray = array.sort((prev, next) => {
        if (prev.name.first < next.name.first) return -1;
        if (prev.name.first > next.name.first) return 1;
        if (prev.name.first === next.name.first) return 0;
    });
    return isAscending ? sortedArray : sortedArray.reverse();
}

const sortByAge = (array, isAscending) => {
    const sortedArray =  array.sort((prev, next) => prev.dob.age - next.dob.age);
    return isAscending ? sortedArray : sortedArray.reverse();
}

const sortByGender = (array, gender) => {
    return gender !== null ? array.filter(friend => friend.gender === gender) : array;
}
