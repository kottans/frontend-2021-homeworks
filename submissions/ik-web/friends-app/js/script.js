document.addEventListener('DOMContentLoaded', () => {

    const url = 'https://randomuser.me/api/?results=80&seed=fa21';
    const usersBox = document.querySelector('.usersBox');

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

    function addUserCardsOnPage(usersInfo) {
        let userCards = '';
        usersInfo.forEach(user => {
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
        document.querySelector('.burger').addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            document.querySelector('.aside').classList.toggle('active');
            document.querySelector('.body').classList.toggle('blocked');
        });
    }
    // ---------------------------------------------------------------
    function doMenu(usersInfo) {
        const menu = document.querySelector('.menu');

        menu.addEventListener('input', ({target}) => {
            let usersInfoCopy = [...usersInfo];
            const inputSearchName = menu.search.value;
            const inputSort = menu.sort.value;
            const inputGenderFilter = menu.gender.value;
            
            if (inputSearchName) usersInfoCopy = doSearchByName(usersInfoCopy, inputSearchName);
            if (inputSort) doSort(usersInfoCopy, inputSort);
            if (inputGenderFilter) usersInfoCopy = doFilterByGender(usersInfoCopy, inputGenderFilter);

            if (usersInfoCopy.length === 0) {
                usersBox.innerHTML = '<h2 class="usersBox__message">No matches found...</h2>';
            } else {
                addUserCardsOnPage(usersInfoCopy);
            }
        });
    }
    // ---------------------------------------------------------------
    function doSearchByName(usersInfoCopy, inputSearch) {
        return usersInfoCopy.filter(user => {
            const userFullName = `${user.name.first} ${user.name.last}`;
            return userFullName.toLowerCase().includes(inputSearch.toLowerCase());
        });
    }
    // ---------------------------------------------------------------
    function doSort(usersInfoCopy, inputSort) {
        const sortFunctions = {
            sortNameAZ: () => usersInfoCopy.sort((a, b) => sortByName(a, b)),
            sortNameZA: () => usersInfoCopy.sort((b, a) => sortByName(a, b)),
            sortAgeAsc: () => usersInfoCopy.sort((a, b) => sortByAge(a, b)),
            sortAgeDesc: () => usersInfoCopy.sort((b, a) => sortByAge(a, b))
        };
        if (sortFunctions.hasOwnProperty(inputSort)) sortFunctions[inputSort]();
    }

    function sortByName(a, b) {
        const fullUserNameA = `${a.name.first} ${a.name.last}`;
        const fullUserNameB = `${b.name.first} ${b.name.last}`;
        return fullUserNameA.localeCompare(fullUserNameB);
    }

    function sortByAge(a, b) {
        const ageA = a.dob.age;
        const ageB = b.dob.age;
        return ageA - ageB;       
    }
    // ---------------------------------------------------------------
    function doFilterByGender(usersInfoCopy, inputGenderFilter) {
        const inputGenderAll = document.querySelector('#all').value;

        if (inputGenderFilter === inputGenderAll) {
            return usersInfoCopy;
        } else return usersInfoCopy.filter(user => inputGenderFilter === user.gender);
    }
    // ---------------------------------------------------------------
    function doReset(usersInfo) {
        document.querySelector('#reset').addEventListener('click', (e) => {
            addUserCardsOnPage(usersInfo);
        });
    }
    // ---------------------------------------------------------------
    async function startApp() {
        const usersInfo = await getUsersInfo();
        addUserCardsOnPage(usersInfo);
        doBurgerMenu();
        doMenu(usersInfo);
        doReset(usersInfo);
    }
    // ===============================================================
    startApp();
});
