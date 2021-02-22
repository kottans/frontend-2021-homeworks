'use strict';

const DATA_URL = 'https://randomuser.me/api/?results=100';
const RAW_DATA = [];
const USER_STOR = new Map();
const mainSection = document.querySelector('.main__section');
const filterSettings = {searchParam: '',
                        genderParam: '',
                        ageParam: '',
                        nameParam: '',
                        filteredData: [],
                        secondFilteredData: []};


const createUserCards = (item) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('main__card-item', 'win__header-border', 'flex', 'flex-column')
    cardItem.innerHTML = `<div class="main__card-header win__header-label flex flex-align-center">
                        <span>Friend</span>
                        </div>
                        <img class="main__card-img" src="${item.picture.large}" alt="user-portret">
                        <p>${item.name.title} ${item.name.first} ${item.name.last}</p>
                        <p>${item.email}</p>
                        <p>${item.dob.age} y.o.</p>
                        <p>${item.location.country}</p>`
    return cardItem;
};

const fetchData = (url) => fetch(url)
.then((res) => {
    if (res.status != 200) {
        throw new Error('Network response was not OK');
    }else{
        return res.json();
    };
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:' , error)
    })

const getResult = (response) => {return response.results};

const storeData = (result) => {
    result.forEach((item) => {
        RAW_DATA.push(item);
        USER_STOR.set(item, createUserCards(item));
    });
};

const getUserNode = (user) => {
    return USER_STOR.get(user);
};

const createUserList = (usersData) => {
    const documentFragment = document.createDocumentFragment();
    usersData.forEach((item) => {documentFragment.appendChild(getUserNode(item))});
    return documentFragment;
};

const appendUserList = (userList) => {
    mainSection.appendChild(userList);
};

const updateUsers = (storeObj) => {
    mainSection.innerHTML = '';
    appendUserList(createUserList(storeObj))
};

const searchFilter = (user) => {
    const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
    return fullName.includes(filterSettings.searchParam.trim());
};

const genderFilter = (user) => {
    if(filterSettings.genderParam === 'all'){
        return true;
    } else{
        return user.gender === filterSettings.genderParam;
    };
};

const ageSort = (prev, next) => {
    return prev.dob.age - next.dob.age;
};

const nameSort = (prev, next) => {
    let nameA = prev.name.last.toLowerCase();
    let nameB = next.name.last.toLowerCase();
    if (nameA < nameB)
        return -1;
    if (nameA > nameB)
        return 1;
    return 0;
};

const applyFilters = (usersData, filter) => {
    let filteredUsersData=[];
    uncheckSortRadio();
    if(filterSettings.filteredData.length < 1 && filterSettings.secondFilteredData.length < 1){
        filteredUsersData = usersData.filter((user) => filter(user));
        filterSettings.filteredData = filteredUsersData;
        filterSettings.filterOne = filter.name;
        return filteredUsersData;
    }else if(filterSettings.filteredData.length >= 1 && filterSettings.secondFilteredData.length < 1 && filterSettings.filterOne === filter.name){
        filteredUsersData = usersData.filter((user) => filter(user));
        filterSettings.filteredData = filteredUsersData;
        filterSettings.filterOne = filter.name;
        return filteredUsersData;
    }else if(filterSettings.filteredData.length >= 1 && filterSettings.secondFilteredData.length < 1 && filterSettings.filterOne !== filter.name){
        filteredUsersData = filterSettings.filteredData.filter((user) => filter(user));
        filterSettings.secondFilteredData = filteredUsersData;
        filterSettings.filterTwo = filter.name;
        return filteredUsersData;
    }else if(filterSettings.filteredData.length >= 1 && filterSettings.secondFilteredData.length >= 1 && filterSettings.filterTwo === filter.name){
        filteredUsersData = filterSettings.filteredData.filter((user) => filter(user));
        filterSettings.secondFilteredData = filteredUsersData;
        filterSettings.filterTwo = filter.name;
        return filteredUsersData;
    }else if(filterSettings.filteredData.length >= 1 && filterSettings.secondFilteredData.length >= 1 && filterSettings.filterOne === filter.name){
        filterSettings.filteredData = [];
        filterSettings.secondFilteredData = [];
        filterSettings.filterTwo = '';
        filterSettings.filterOne = filter.name;
        uncheckAllRadio();
        clearInputText();
        return usersData;
    }
};

const applySort = (usersData, sortFunction) => {
    let sortedUsersData = [];
    if (filterSettings.filteredData.length >= 1 && filterSettings.secondFilteredData.length >= 1) {
        sortedUsersData = filterSettings.secondFilteredData.slice().sort(sortFunction);
    } else if (filterSettings.filteredData.length >= 1  && filterSettings.secondFilteredData.length < 1) {
        sortedUsersData = filterSettings.filteredData.slice().sort(sortFunction);
    } else if (filterSettings.filteredData.length < 1  && filterSettings.secondFilteredData.length < 1) {
        sortedUsersData = usersData.slice().sort(sortFunction);
        };

    if (sortFunction.name === 'ageSort'){
        if (filterSettings.ageParam === 'ascending'){
            return sortedUsersData
        } else {
            return sortedUsersData.reverse();
        };
    } else if (sortFunction.name === 'nameSort') {
        if (filterSettings.nameParam === 'az') {
            return sortedUsersData;
        } else {
            return sortedUsersData.reverse();
        };
}};


const setGenderAllCheck = () => {
    document.querySelector('input[id="gender-all"]').checked = true;
};

const uncheckAllRadio = () => {
    document.querySelectorAll('input[type="radio"]').forEach((item) => {
        item.checked = false;
    });
    setGenderAllCheck();
};

const uncheckSortRadio = () => {
    document.querySelectorAll('input[name="name"]').forEach((item) => {
        item.checked = false;
    });
    document.querySelectorAll('input[name="age"]').forEach((item) => {
        item.checked = false;
    })
};

const clearInputText = () => {
    document.querySelector('input[type="text"]').value='';
};

const changeEventHandler= ({target}) => {
    if (target.name === 'gender') {
        filterSettings.genderParam = target.value;
        uncheckSortRadio();
        updateUsers(applyFilters(RAW_DATA, genderFilter));;
    }else if (target.name === 'name') {
        filterSettings.nameParam = target.value;
        updateUsers(applySort(RAW_DATA, nameSort));
    }else if (target.name === 'age') {
        filterSettings.ageParam = target.value;
        updateUsers(applySort(RAW_DATA, ageSort));
    }
}

const resetEventHandler = function({target}) {
    if (target.value === 'reset'){
        uncheckAllRadio();
        clearInputText();
        filterSettings.filteredData.splice(0,filterSettings.filteredData.length);
        filterSettings.filteredData = [];
        filterSettings.secondFilteredData = [];
        updateUsers(RAW_DATA);
    };
}

const inputEventHandler = ({target}) => {
    filterSettings.searchParam = target.value.toLowerCase();
        uncheckSortRadio();
        updateUsers(applyFilters(RAW_DATA, searchFilter));
}

const setFilters = () => {
    document.forms.filters.addEventListener('keyup', inputEventHandler);
    document.forms.filters.addEventListener('change', changeEventHandler);
    document.forms.filters.addEventListener('click', resetEventHandler);
};

const getData = fetchData(DATA_URL)
.then((res) => getResult(res))
.then((result) => storeData(result))
.then(() => updateUsers(RAW_DATA) )
.then(() => {uncheckAllRadio(); clearInputText()})
.then (() => {setFilters()});
