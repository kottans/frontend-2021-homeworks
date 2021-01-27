export function makeForm() {
    const form = document.createElement('form');
    form.className = 'form sidebar__form';
    form.name = 'sortingAndFiltering';
    form.innerHTML = `
        <fieldset name="sorting" class="form__section">
            <legend>Sorting:</legend>
            <div class="form__radiobuttons form__radiobuttons--align-right">
                <span class="form__title">By age:</span>
                <input type="radio" name="sort" value="age-desc" id="sortByAgeDESC" class="form__radiobutton">
                <label for="sortByAgeDESC" class="form__radiobutton-label">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.55 96.55">
                        <g>
                            <g>
                                <path d="M47.141,40.174h26.76c0.654,0,1.184-0.527,1.184-1.18V24.928c0-0.652-0.528-1.18-1.184-1.18h-26.76
                    c-0.652,0-1.182,0.527-1.182,1.18v14.067C45.959,39.647,46.488,40.174,47.141,40.174z"/>
                                <path d="M47.141,16.549h15.122c0.652,0,1.182-0.529,1.182-1.182V1.303c0-0.654-0.528-1.182-1.182-1.182H47.141
                    c-0.652,0-1.182,0.527-1.182,1.182v14.064C45.959,16.02,46.488,16.549,47.141,16.549z"/>
                                <path d="M47.141,68.299h36.98c0.651,0,1.181-0.527,1.181-1.18V53.055c0-0.652-0.528-1.182-1.181-1.182h-36.98
                    c-0.652,0-1.182,0.529-1.182,1.182v14.064C45.959,67.771,46.488,68.299,47.141,68.299z"/>
                                <path d="M94.338,80.003H47.141c-0.652,0-1.182,0.526-1.182,1.183v14.062c0,0.652,0.529,1.182,1.182,1.182h47.198
                    c0.652,0,1.181-0.529,1.181-1.182V81.184C95.519,80.529,94.992,80.003,94.338,80.003z"/>
                                <path d="M39.183,65.595h-8.011V2c0-1.105-0.896-2-2-2h-16.13c-1.104,0-2,0.895-2,2v63.595h-8.01c-0.771,0-1.472,0.443-1.804,1.138
                    C0.895,67.427,0.99,68.25,1.472,68.85l18.076,26.954c0.38,0.474,0.953,0.746,1.559,0.746s1.178-0.272,1.558-0.746L40.741,68.85
                    c0.482-0.601,0.578-1.423,0.245-2.117C40.654,66.039,39.954,65.595,39.183,65.595z"/>
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </label>

                <input type="radio" name="sort" value="age-asc" id="sortByAgeASC" class="form__radiobutton">
                <label for="sortByAgeASC" class="form__radiobutton-label">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.55 96.55">
                        <g>
                            <g>
                                <path d="M73.901,56.376h-26.76c-0.652,0-1.182,0.526-1.182,1.181v14.065c0,0.651,0.529,1.18,1.182,1.18h26.76
                                    c0.654,0,1.184-0.526,1.184-1.18V57.555C75.084,56.902,74.555,56.376,73.901,56.376z"/>
                                <path d="M62.262,80.001H47.141c-0.652,0-1.182,0.528-1.182,1.183v14.063c0,0.653,0.529,1.182,1.182,1.182h15.122
                                    c0.652,0,1.182-0.526,1.182-1.182V81.182C63.444,80.529,62.916,80.001,62.262,80.001z"/>
                                <path d="M84.122,28.251h-36.98c-0.652,0-1.182,0.527-1.182,1.18v14.063c0,0.652,0.529,1.182,1.182,1.182h36.98
                                    c0.651,0,1.181-0.529,1.181-1.182V29.43C85.301,28.778,84.773,28.251,84.122,28.251z"/>
                                <path d="M94.338,0.122H47.141c-0.652,0-1.182,0.529-1.182,1.182v14.063c0,0.654,0.529,1.182,1.182,1.182h47.198
                                    c0.652,0,1.181-0.527,1.181-1.182V1.303C95.519,0.651,94.992,0.122,94.338,0.122z"/>
                                <path d="M39.183,65.595h-8.011V2c0-1.105-0.896-2-2-2h-16.13c-1.104,0-2,0.895-2,2v63.595h-8.01c-0.771,0-1.472,0.443-1.804,1.138
                                    C0.895,67.427,0.99,68.25,1.472,68.85l18.076,26.954c0.38,0.474,0.953,0.746,1.559,0.746s1.178-0.272,1.558-0.746L40.741,68.85
                                    c0.482-0.601,0.578-1.423,0.245-2.117C40.654,66.039,39.954,65.595,39.183,65.595z"/>
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </label>
            </div>
            <div class="form__radiobuttons form__radiobuttons--align-right">
                <span class="form__title">By name:</span>

                <input type="radio" name="sort" value="name-desc" id="sortByNameDESC" class="form__radiobutton">
                <label for="sortByNameDESC" class="form__radiobutton-label">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.55 96.55">
                        <g>
                            <g>
                                <path d="M47.141,40.174h26.76c0.654,0,1.184-0.527,1.184-1.18V24.928c0-0.652-0.528-1.18-1.184-1.18h-26.76
                    c-0.652,0-1.182,0.527-1.182,1.18v14.067C45.959,39.647,46.488,40.174,47.141,40.174z"/>
                                <path d="M47.141,16.549h15.122c0.652,0,1.182-0.529,1.182-1.182V1.303c0-0.654-0.528-1.182-1.182-1.182H47.141
                    c-0.652,0-1.182,0.527-1.182,1.182v14.064C45.959,16.02,46.488,16.549,47.141,16.549z"/>
                                <path d="M47.141,68.299h36.98c0.651,0,1.181-0.527,1.181-1.18V53.055c0-0.652-0.528-1.182-1.181-1.182h-36.98
                    c-0.652,0-1.182,0.529-1.182,1.182v14.064C45.959,67.771,46.488,68.299,47.141,68.299z"/>
                                <path d="M94.338,80.003H47.141c-0.652,0-1.182,0.526-1.182,1.183v14.062c0,0.652,0.529,1.182,1.182,1.182h47.198
                    c0.652,0,1.181-0.529,1.181-1.182V81.184C95.519,80.529,94.992,80.003,94.338,80.003z"/>
                                <path d="M39.183,65.595h-8.011V2c0-1.105-0.896-2-2-2h-16.13c-1.104,0-2,0.895-2,2v63.595h-8.01c-0.771,0-1.472,0.443-1.804,1.138
                    C0.895,67.427,0.99,68.25,1.472,68.85l18.076,26.954c0.38,0.474,0.953,0.746,1.559,0.746s1.178-0.272,1.558-0.746L40.741,68.85
                    c0.482-0.601,0.578-1.423,0.245-2.117C40.654,66.039,39.954,65.595,39.183,65.595z"/>
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </label>

                <input type="radio" name="sort" value="name-asc" id="sortByNameASC" class="form__radiobutton">
                <label for="sortByNameASC" class="form__radiobutton-label">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.55 96.55">
                        <g>
                            <g>
                                <path d="M73.901,56.376h-26.76c-0.652,0-1.182,0.526-1.182,1.181v14.065c0,0.651,0.529,1.18,1.182,1.18h26.76
                                    c0.654,0,1.184-0.526,1.184-1.18V57.555C75.084,56.902,74.555,56.376,73.901,56.376z"/>
                                <path d="M62.262,80.001H47.141c-0.652,0-1.182,0.528-1.182,1.183v14.063c0,0.653,0.529,1.182,1.182,1.182h15.122
                                    c0.652,0,1.182-0.526,1.182-1.182V81.182C63.444,80.529,62.916,80.001,62.262,80.001z"/>
                                <path d="M84.122,28.251h-36.98c-0.652,0-1.182,0.527-1.182,1.18v14.063c0,0.652,0.529,1.182,1.182,1.182h36.98
                                    c0.651,0,1.181-0.529,1.181-1.182V29.43C85.301,28.778,84.773,28.251,84.122,28.251z"/>
                                <path d="M94.338,0.122H47.141c-0.652,0-1.182,0.529-1.182,1.182v14.063c0,0.654,0.529,1.182,1.182,1.182h47.198
                                    c0.652,0,1.181-0.527,1.181-1.182V1.303C95.519,0.651,94.992,0.122,94.338,0.122z"/>
                                <path d="M39.183,65.595h-8.011V2c0-1.105-0.896-2-2-2h-16.13c-1.104,0-2,0.895-2,2v63.595h-8.01c-0.771,0-1.472,0.443-1.804,1.138
                                    C0.895,67.427,0.99,68.25,1.472,68.85l18.076,26.954c0.38,0.474,0.953,0.746,1.559,0.746s1.178-0.272,1.558-0.746L40.741,68.85
                                    c0.482-0.601,0.578-1.423,0.245-2.117C40.654,66.039,39.954,65.595,39.183,65.595z"/>
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </label>
            </div>
        </fieldset>
        <fieldset name="filtering" class="form__section">
            <legend>Filtering:</legend>
            <div class="form__input-and-button">
                <input type="number" min="1" max="200" class="form__input-field" name="age" placeholder="Filtering by age">
                <!-- <button class="form__button">Filter by age</button> -->
            </div>
            <div class="form__input-and-button">
                <input type="text" class="form__input-field" name="name" placeholder="Filtering by name">
                <!-- <button class="form__button">Filter by name</button> -->
            </div>
            <div class="form__radiobuttons form__radiobuttons-and-button form__radiobuttons--column-align-center form-section-margin">
                <div class="form__radiobuttons form__radiobuttons--align-center">
                    <label>
                        <input type="radio" name="gender" value="male">
                        Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female">
                        Female
                    </label>
                    <label>
                        <input type="radio" name="gender" value="all">
                        All
                    </label>
                </div>

                <!-- <button class="form__button">Filter by gender</button> -->
            </div>
        </fieldset>
        <input type="reset" class="form__button" value="Reset">
    `;

    return form;
}
