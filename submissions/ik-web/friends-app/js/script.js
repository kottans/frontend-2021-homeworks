document.addEventListener('DOMContentLoaded', () => {

    const url = 'https://randomuser.me/api/?results=80&seed=fa21';
    const usersBox = document.querySelector('.usersBox');
    const aside = document.querySelector('.aside');
    const menu = document.querySelector('.menu');
    const body = document.querySelector('.body');
    const inputGenderAll = document.querySelector('#all').value;
    const burgerMenu = document.querySelector('.burger');

    // ---------------------------------------------------------------
    function createUserCard(name, photo, gender, age, phone, email) {
        return `
            <div class="userCard">
                <div class="userCard__inner">
                    <h2 class="userCard__userName">${name}</h2>
                    <div class="userCard__userPhoto"><img src=${photo} alt="photo"></div>
                    <div class="userCard__userInfo userInfo">
                        <div class="userInfo__item">${gender}</div>
                        <div class="userInfo__item">${age} years old</div>
                        <div class="userInfo__item">
                            <a href="tel:${phone}">${phone}</a>
                        </div>
                        <div class="userInfo__item">
                            <a href="mailto:${email}">${email}</a>
                        </div>                    
                    </div>
                </div>
            </div>
        `;
    }
    
    function getUsersInfo() {
        return fetch(url)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => window.location.reload());
    }

    function addUserCardsOnPage(userInfo) {
        let userCards = '';
        userInfo.forEach(user => {
            userCards += createUserCard(
                `${user.name.first} ${user.name.last}`,
                user.picture.large, 
                user.gender, 
                user.dob.age, 
                user.phone,
                user.email
            );
        });
        usersBox.innerHTML = userCards;
    }
    // ---------------------------------------------------------------
    function doBurgerMenu() {
        burgerMenu.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            aside.classList.toggle('active');
            body.classList.toggle('blocked');
        });
    }
    // ---------------------------------------------------------------
    function doMenu(userInfo) {
        menu.addEventListener('input', ({target}) => {
            let userInfoCopy = [...userInfo];
            const inputSearchName = menu.search.value;
            const inputSort = menu.sort.value;
            const inputGenderFilter = menu.gender.value;
            
            if (inputSearchName) userInfoCopy = doSearchByName(userInfoCopy, inputSearchName);
            if (inputSort) doSort(userInfoCopy, inputSort);
            if (inputGenderFilter) userInfoCopy = doFilterByGender(userInfoCopy, inputGenderFilter);

            if (userInfoCopy.length === 0) {
                usersBox.innerHTML = '<h2 class="usersBox__message">No matches found...</h2>';
            } else {
                addUserCardsOnPage(userInfoCopy);
            }
        });
    }
    // ---------------------------------------------------------------
    function doSearchByName(userInfoCopy, inputSearch) {
        return userInfoCopy.filter(user => {
            const userFullName = `${user.name.first} ${user.name.last}`;
            return userFullName.toLowerCase().includes(inputSearch.toLowerCase());
        });
    }
    // ---------------------------------------------------------------
    function doSort(userInfoCopy, inputSort) {
        const sortFunctions = {
            sortNameAZ: () => userInfoCopy.sort((user1, user2) => sortByName(user1, user2)),
            sortNameZA: () => userInfoCopy.sort((user2, user1) => sortByName(user1, user2)),
            sortAgeAsc: () => userInfoCopy.sort((user1, user2) => sortByAge(user1, user2)),
            sortAgeDesc: () => userInfoCopy.sort((user2, user1) => sortByAge(user1, user2))
        };
        if (sortFunctions.hasOwnProperty(inputSort)) sortFunctions[inputSort]();
    }

    function sortByName(user1, user2) {
        const userFullName1 = `${user1.name.first} ${user1.name.last}`;
        const userFullName2 = `${user2.name.first} ${user2.name.last}`;
        return userFullName1.localeCompare(userFullName2);
    }

    function sortByAge(user1, user2) {
        const userAge1 = user1.dob.age;
        const userAge2 = user2.dob.age;
        return userAge1 - userAge2;       
    }
    // ---------------------------------------------------------------
    function doFilterByGender(userInfoCopy, inputGenderFilter) {
        if (inputGenderFilter === inputGenderAll) {
            return userInfoCopy;
        } else return userInfoCopy.filter(user => inputGenderFilter === user.gender);
    }
    // ---------------------------------------------------------------
    function doReset(userInfo) {
        document.querySelector('#reset').addEventListener('click', (e) => {
            addUserCardsOnPage(userInfo);
        });
    }
    // ---------------------------------------------------------------
    async function startApp() {
        const userInfo = await getUsersInfo();
        addUserCardsOnPage(userInfo);
        doBurgerMenu();
        doMenu(userInfo);
        doReset(userInfo);
    }
    // ===============================================================
    startApp();
});
