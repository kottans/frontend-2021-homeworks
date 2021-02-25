'use strict';

const DATA_URL = 'https://randomuser.me/api/?results=100';
let RAW_DATA = [];
const NODES_STORAGE = new Map();
const mainSection = document.querySelector('.main__section');
const filterSettings = {
searchParam: '',
genderParam: '',
ageParam: '',
nameParam: '',
filteredData: [],
secondFilteredData: [],
filterOne: '',
filterTwo: '',
};

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

const getResult = (response) =>  response.results;

const storeData = (results) => {
    RAW_DATA = results
    results.forEach((item) => {
        NODES_STORAGE.set(item, createUserCards(item));
    });
};

const getUserNode = (user) => {
    return NODES_STORAGE.get(user);
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

const checkIsFiltered = (filteredDataStorage) => filterSettings[filteredDataStorage].length >= 1;

const checkThisFilterMadeFiltration = ( filter, filterNameRegistr) => filterSettings[filterNameRegistr] === filter.name;

const applyFilters = (usersData, filter) => {
    uncheckSortRadio();

    const makeFirstFiltration = (filter) => {
        const firstFiltrationUsersResult = usersData.filter((user) => filter(user));
        filterSettings.filteredData = firstFiltrationUsersResult;
        filterSettings.filterOne = filter.name;
        return firstFiltrationUsersResult;
    }
    const makeSecondFiltration = (filter) => {
        const secondFiltrationUsersResult = filterSettings.filteredData.filter((user) => filter(user));
        filterSettings.secondFilteredData = secondFiltrationUsersResult;
        filterSettings.filterTwo = filter.name;
        return secondFiltrationUsersResult;
    }

    const resetFilters = () => {
        filterSettings.filteredData = [];
        filterSettings.secondFilteredData = [];
        filterSettings.filterTwo = '';
        filterSettings.filterOne = '';
        uncheckAllRadio();
        clearInputText();
    }

    if( !checkIsFiltered('filteredData') && !checkIsFiltered('secondFilteredData')){
        return makeFirstFiltration(filter);

    }else if( checkIsFiltered('filteredData') && !checkIsFiltered('secondFilteredData') && checkThisFilterMadeFiltration(filter, 'filterOne') ){
        return makeFirstFiltration(filter);

    }else if( checkIsFiltered('filteredData') && !checkIsFiltered('secondFilteredData') && !checkThisFilterMadeFiltration(filter, 'filterOne') ){
        return makeSecondFiltration(filter);

    }else if( checkIsFiltered('filteredData') && checkIsFiltered('secondFilteredData') && checkThisFilterMadeFiltration(filter, 'filterTwo') ){
        return makeSecondFiltration(filter);

    }else if( checkIsFiltered('filteredData') && checkIsFiltered('secondFilteredData') && checkThisFilterMadeFiltration(filter, 'filterOne') ){
        resetFilters();
        return makeFirstFiltration(filter);
    }
};

const applySort = (usersData, sortFunction) => {
    let sortedUsersData = [];

    const checkSortFunctionWasApplyed = (sortFunction, sortType) => sortFunction.name === sortType;

    const checkTypeOfSort = (sittingsParamName, settingsParam) => filterSettings[sittingsParamName] === settingsParam;

    if (checkIsFiltered('filteredData') && checkIsFiltered('secondFilteredData')) {
        sortedUsersData = filterSettings.secondFilteredData.slice().sort(sortFunction);
    } else if (checkIsFiltered('filteredData')  && !checkIsFiltered('secondFilteredData')) {
        sortedUsersData = filterSettings.filteredData.slice().sort(sortFunction);
    } else if (!checkIsFiltered('filteredData')  && !checkIsFiltered('secondFilteredData')) {
        sortedUsersData = usersData.slice().sort(sortFunction);
        };

    if (checkSortFunctionWasApplyed(sortFunction, 'ageSort')) {
        uncheckRadioType('name');
        if (checkTypeOfSort('ageParam', 'ascending')){
            return sortedUsersData
        } else {
            return sortedUsersData.reverse();
        };
    } else if (checkSortFunctionWasApplyed(sortFunction, 'nameSort')) {
        uncheckRadioType('age');
        if (checkTypeOfSort('nameParam', 'az')) {
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

const uncheckRadioType = (radioName) => {
    document.querySelectorAll(`input[name="${radioName}"]`).forEach((item) => {
        item.checked = false;
    });
}

const uncheckSortRadio = () => {
    uncheckRadioType('name');
    uncheckRadioType('age');
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
    if (target.value.toLowerCase() === 'reset'){
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
    document.forms.filters.reset.addEventListener('click', resetEventHandler);
};

const getData = fetchData(DATA_URL)
.then((res) => getResult(res))
.then((result) => storeData(result))
.then(() => updateUsers(RAW_DATA) )
.then(() => {uncheckAllRadio(); clearInputText()})
.then (() => {setFilters()});
