document.addEventListener("DOMContentLoaded", () => {
    fetchContent().then((response) => startApp(response.results)).catch(error => console.log(error.message));
})

const startApp = (response) => {
    renderContent(response);
    const friendsArray = response;

    document.querySelector("#filter-form").addEventListener("input", ({target}) => {
        let sortedArray = [];
        switch (target.id) {
            case "search":
                sortedArray = searchByValue(friendsArray, target.value);
                break;
            case "name-ascending":
                sortedArray = sortArray(friendsArray, true, true);
                break;
            case "name-descending":
                sortedArray = sortArray(friendsArray, false, true);
                break;
            case "age-ascending":
                sortedArray = sortArray(friendsArray, true, false);
                break;
            case "age-descending":
                sortedArray = sortArray(friendsArray, false, false);
                break;
            case "female":
                resetCheckedFilters();
                sortedArray = filterByGender(friendsArray, "female");
                break;
            case "male":
                resetCheckedFilters();
                sortedArray = filterByGender(friendsArray, "male");
                break;
            case "all":
                resetCheckedFilters();
                sortedArray = [...friendsArray];
                break;
        }
        renderContent(sortedArray);
    });
}

const fetchContent = function () {
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
    let sortedArray = checkGender(array);
    sortedArray = checkNameAge(sortedArray);
    return sortedArray.filter(friend => {
        const firstLastName = `${friend.name.first} ${friend.name.last}`;
        return firstLastName.includes(value);
    })
}

const filterByGender = (array, gender) => {
    return array.filter(friend => friend.gender === gender);
}

const sortArray = (array, isAscending, isNameSorting) => {
    const sortedArray = checkGender(array);
    sortedArray.sort((prev, next) => {
        const prevValue = isNameSorting ? prev.name.first : prev.dob.age;
        const nextValue = isNameSorting ? next.name.first : next.dob.age;
        if (prevValue < nextValue) return -1;
        if (prevValue > nextValue) return 1;
    });
    return isAscending ? sortedArray : sortedArray.reverse();
}

const checkGender = (array) => {
    let sortedArray = [...array];
    if (document.getElementById("female").checked) {
        sortedArray = filterByGender(array, "female");
    } else if (document.getElementById("male").checked) {
        sortedArray = filterByGender(array, "male");
    }
    return sortedArray;
}

const checkNameAge = (array) => {
    let sortedArray = [...array];
    if (document.getElementById("age-ascending").checked) {
        sortedArray = sortArray(sortedArray, true, false);
    } else if (document.getElementById("age-descending").checked) {
        sortedArray = sortArray(sortedArray, false, false);
    } else if (document.getElementById("name-ascending").checked) {
        sortedArray = sortArray(sortedArray, true, true);
    } else if (document.getElementById("name-descending").checked) {
        sortedArray = sortArray(sortedArray, false, true);
    }
    return sortedArray;
}

const resetCheckedFilters = () => {
    document.querySelectorAll('input[name="filter"]:checked').forEach(element => element.checked = false);
}
