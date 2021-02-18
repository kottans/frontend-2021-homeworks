'use strict';

const DATA_URL = 'https://randomuser.me/api/?results=100';
const RAW_DATA = [];
const USER_STOR = new Map();
const mainSection = document.querySelector('.main__section');
const filterSettings = {searchParam: '',
                        genderParam: '',
                        ageParam: '',
                        nameParam: '',
                        filteredData:[]};


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
    filteredUsersData = usersData.filter((user) => filter(user));
    filterSettings.filteredData = filteredUsersData;
    return filteredUsersData;
};

const applySort = (usersData, sortFunction) => {
    let sortedUsersData = [];
    sortedUsersData = filterSettings.filteredData.length > 0? filterSettings.filteredData.sort(sortFunction).slice(): usersData.sort(sortFunction).slice();
        if(sortFunction.name === 'ageSort'){
            if(filterSettings.ageParam === 'ascending'){
                return sortedUsersData
            }else{
                return sortedUsersData.reverse();
            }
        } else if(sortFunction.name === 'nameSort'){
            if(filterSettings.nameParam === 'az'){
                return sortedUsersData;
            }else{
                return sortedUsersData.reverse();
            };
        };
};

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

const setFilters = () => {
    document.querySelector('.filter-search').addEventListener('keyup', function({target}) {
        Object.keys(filterSettings).forEach((key) => !Array.isArray(filterSettings[key]) ? filterSettings[key] = '': filterSettings[key]=[]);
        filterSettings.searchParam = target.value.toLowerCase();
        updateUsers(applyFilters(RAW_DATA, searchFilter));
        uncheckAllRadio();
    });

    document.querySelector('.filter-gender').addEventListener('change', function({target}) {
        filterSettings.genderParam = target.value;
        uncheckSortRadio();
        updateUsers(applyFilters(RAW_DATA, genderFilter));
    });

    document.querySelector('.filter-name').addEventListener('change', function({target}) {
        filterSettings.nameParam = target.value;
        updateUsers(applySort(RAW_DATA, nameSort));
    });

    document.querySelector('.filter-age').addEventListener('change', function({target}) {
        filterSettings.ageParam = target.value;
        updateUsers(applySort(RAW_DATA, ageSort));
    });

    document.querySelector('.main__form-reset').addEventListener('click', function({target}) {
        if (target.value.toLowerCase() === 'reset'){
            uncheckAllRadio();
            clearInputText();
            filterSettings.filteredData.splice(0,filterSettings.filteredData.length);
            updateUsers(RAW_DATA);
        };
    });
};

const getData = fetchData(DATA_URL)
.then((res) => getResult(res))
.then((result) => storeData(result))
.then(() => updateUsers(RAW_DATA) )
.then(() => {uncheckAllRadio(); clearInputText()})
.then (() => {setFilters()});
