function createNewCategoryInAddTask() {
    currentCat = '';
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = `
        <h4 class="addTask-form-headlines">Category</h4>
        <div class="dropdown grey-text">
            <input id="new-cat-input" class="new-cat-input" minvalue="3" maxlength="16" placeholder="New Category Name" required>
            <div class="create-cat-icon-box">
                <img src="./img/plus.png" class="create-category-icon resize-icon" onclick="resetAddCategorySection()">
                <div class="gap-line"></div>
                <img src="./img/check_mark.png" class="create-category-icon" onclick="addCategory()">
            </div>
        </div>
        <div class="new-cat-color-select-box">
            <div id="pickColor1" class="addTask-category-dot dot-hover pointer" style="background-color:red;" 
            onclick="addBorderToPickedColor('pickColor1'); currentPickedColor = 'red'"></div>
            <div id="pickColor2" class="addTask-category-dot dot-hover pointer" style="background-color:orange;" 
            onclick="addBorderToPickedColor('pickColor2'); currentPickedColor = 'orange'"></div>
            <div id="pickColor3" class="addTask-category-dot dot-hover pointer" style="background-color:lightgreen;" 
            onclick="addBorderToPickedColor('pickColor3'); currentPickedColor = 'lightgreen'"></div>
            <div id="pickColor4" class="addTask-category-dot dot-hover pointer" style="background-color:lightblue;" 
            onclick="addBorderToPickedColor('pickColor4'); currentPickedColor = 'lightblue'"></div>
            <div id="pickColor5" class="addTask-category-dot dot-hover pointer" style="background-color:yellow;" 
            onclick="addBorderToPickedColor('pickColor5'); currentPickedColor = 'yellow'"></div>
            <div id="pickColor6" class="addTask-category-dot dot-hover pointer" style="background-color:aqua;" 
            onclick="addBorderToPickedColor('pickColor6'); currentPickedColor = 'aqua'"></div>
            <div id="pickColor7" class="addTask-category-dot dot-hover pointer" style="background-color:grey;" 
            onclick="addBorderToPickedColor('pickColor7'); currentPickedColor = 'grey'"></div>
        </div>
    `;
}