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
                resetCheckedFilters();
                sortedArray = sortByGender(friendsArray, "female");
                break;
            case "male":
                resetCheckedFilters();
                sortedArray = sortByGender(friendsArray, "male");
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

const sortByName = (array, isAscending) => {
    return sortArray(array, isAscending, true);
}

const sortByAge = (array, isAscending) => {
    return sortArray(array, isAscending, false);
}

const sortByGender = (array, gender) => {
    return array.filter(friend => friend.gender === gender);
}

const sortArray = (array, isAscending, isNameSorting) => {
    const sortedArray = checkGender(array);
    sortedArray.sort((prev, next) => {
        const prevValue = isNameSorting ? prev.name.first : prev.dob.age;
        const nextValue = isNameSorting ? next.name.first : next.dob.age;
        if (prevValue < nextValue) return -1;
        if (prevValue > nextValue) return 1;
        if (prevValue === nextValue) return 0;
    });
    return isAscending ? sortedArray : sortedArray.reverse();
}

const checkGender = (array) => {
    let sortedArray = [...array];
    if (document.getElementById("female").checked) {
        sortedArray = sortByGender(array, "female");
    } else if (document.getElementById("male").checked) {
        sortedArray = sortByGender(array, "male");
    }
    return sortedArray;
}

const checkNameAge = (array) => {
    let sortedArray = [...array];
    if (document.getElementById("age-ascending").checked) {
        sortedArray = sortByAge(sortedArray, true);
    } else if (document.getElementById("age-descending").checked) {
        sortedArray = sortByAge(sortedArray, false);
    } else if (document.getElementById("name-ascending").checked) {
        sortedArray = sortByName(sortedArray, true);
    } else if (document.getElementById("name-descending").checked) {
        sortedArray = sortByName(sortedArray, false);
    }
    return sortedArray;
}

const resetCheckedFilters = () => {
    document.querySelectorAll('input[name="filter"]:checked').forEach(element => element.checked = false);
}
