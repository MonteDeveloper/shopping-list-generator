const addSectionBtn = document.getElementById("my-addSectionBtn");
const listSectionBtn = document.getElementById("my-listSectionBtn");
const trashSectionBtn = document.getElementById("my-trashSectionBtn");
const footerButtons = [addSectionBtn, listSectionBtn, trashSectionBtn];

const addSection = document.getElementById("my-addSection");
const listSection = document.getElementById("my-listSection");
const trashSection = document.getElementById("my-trashSection");
const sectionsPage = [addSection, listSection, trashSection];

let mySpecialChar = "-ß-";

let shopListTexts;
try {
    console.log("shoplist: ", localStorage.shopListTexts);
    shopListTexts = JSON.parse(localStorage.shopListTexts);
} catch (error) {
    // console.error(error);
    shopListTexts = [];
}

let trashListTexts;
try {
    console.log("trashlist: ", localStorage.trashListTexts);
    trashListTexts = JSON.parse(localStorage.trashListTexts);
} catch (error) {
    // console.error(error);
    trashListTexts = [];
}

let shoppingListCounter;
if(!isNaN(localStorage.shoppingListCounter)) {
    console.log("shoppingListCounter: ", localStorage.shoppingListCounter);
    shoppingListCounter = JSON.parse(localStorage.shoppingListCounter);
} else {
    shoppingListCounter = 0;
}

let trashListCounter;
if(!isNaN(localStorage.trashListCounter)) {
    console.log("trashListCounter: ", localStorage.trashListCounter);
    trashListCounter = JSON.parse(localStorage.trashListCounter);
} else {
    trashListCounter = 0;
}

let newIdCounter;
if(!isNaN(localStorage.newIdCounter)) {
    console.log("newIdCounter: ", localStorage.newIdCounter);
    newIdCounter = JSON.parse(localStorage.newIdCounter);
} else {
    newIdCounter = 0;
}

if(shopListTexts.length <= 0 && trashListTexts.length <= 0){
    localStorage.clear();
}else{
    addAllElementOnStorage();
}

function addElementToList(sectionOrder, trashText){
    if (sectionOrder == 1) {
        let text = document.getElementById("my-textarea").value;
        let shoppingListTexts = text.split("\n");
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];

        if (text != "") {
            for (listText of shoppingListTexts) {
                if(listText.replace(" ", "") != ""){
                    shoppingListCounter += 1;
                    newIdCounter += 1;
    
                    boxElement.innerHTML += `
                    <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="shop-${newIdCounter}" onclick="addElementToList(2, '${listText}'); cancelElementToList(1, ${newIdCounter})">
                        <p class="text-start text-white m-0 ms-2 col-9 text-break">
                            ${listText}
                        </p>
                        <a class="my-iconButton my-mainButton">
                            <i class="fa-solid fa-square-check fs-3"></i>
                        </a>
                    </div>
                    `;

                    shopListTexts.push(listText + mySpecialChar + newIdCounter);
                    localStorage.shopListTexts = JSON.stringify(shopListTexts);
                    console.log("shoplist: ", localStorage.shopListTexts);
                }
            }

            document.getElementById("my-textarea").value = "";
        }
    }else if(sectionOrder == 2) {
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];
        trashListCounter += 1;
        newIdCounter += 1;

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="trash-${newIdCounter}" onclick="addElementToList(-1, '${trashText}'); cancelElementToList(2, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9 text-break">
                ${trashText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
            </a>
        </div>
        `;

        trashListTexts.push(trashText + mySpecialChar + newIdCounter);
        localStorage.trashListTexts = JSON.stringify(trashListTexts);
        console.log("trashlist: ", localStorage.trashListTexts);
    }else{
        let boxElement = sectionsPage[1].getElementsByClassName("my-boxList")[0];
        shoppingListCounter += 1;
        newIdCounter += 1;

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="shop-${newIdCounter}" onclick="addElementToList(2, '${trashText}'); cancelElementToList(1, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9 text-break">
                ${trashText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-square-check fs-3"></i>
            </a>
        </div>
        `;

        shopListTexts.push(trashText + mySpecialChar + newIdCounter);
        localStorage.shopListTexts = JSON.stringify(shopListTexts);
        console.log("shoplist: ", localStorage.shopListTexts);
    }

    changeMessageBoxVisibility();
}
function resetList(idSection){
    if((idSection == 1 && shoppingListCounter > 0) || (idSection == 2 && trashListCounter > 0)){
        let isExecuted = confirm('Vuoi davvero pulire tutto dalla tua lista "ELIMINATI DI RECENTE"? Non potrai più recuperarla!');
    
        if(isExecuted){
            let sectionElement;
        
            if(idSection == 1){
                sectionElement = document.getElementById("my-listSection");
        
                shoppingListCounter = 0;
                shopListTexts = [];
                localStorage.shopListTexts = undefined;
        
            } else {
                sectionElement = document.getElementById("my-trashSection");
        
                trashListCounter = 0;
                trashListTexts = [];
                localStorage.trashListTexts = undefined;
            }
        
            let rowList = sectionElement.getElementsByClassName("my-rowList");
            rowList = Array.from(rowList);
            console.log(rowList.length);
            for (row of rowList) {
                row.remove();
            }
        
            changeMessageBoxVisibility();
        }
    }
}

function cancelElementToList(idSection, idRow){
    let sectionName;
    if(idSection == 1){
        sectionName = "shop";
        shoppingListCounter -= 1;

        shopListTexts = shopListTexts.filter(item => !item.endsWith(mySpecialChar + idRow));

        localStorage.shopListTexts = JSON.stringify(shopListTexts);
    }else{
        sectionName = "trash";
        trashListCounter -= 1;

        trashListTexts = trashListTexts.filter(item => !item.endsWith(mySpecialChar + idRow));

        localStorage.trashListTexts = JSON.stringify(trashListTexts);
    }
    let boxElement = document.getElementById(`${sectionName}-${idRow}`);

    removeFadeOut(boxElement, 500);
}

function removeFadeOut(element, speed) {
    var seconds = speed/1000;
    element.style.animation = "fadeOutElement "+ seconds + "s forwards";

    setTimeout(function() {
        element.remove();
        changeMessageBoxVisibility();
    }, speed);
}

function changeActivity(btnOrder){
    for (button of footerButtons){
        button.classList.remove("my-iconActive");
    }
    footerButtons[btnOrder].classList.add("my-iconActive");
}

function changeSectionPage(sectionOrder){
    for (section of sectionsPage){
        section.classList.add("d-none");
    }
    sectionsPage[sectionOrder].classList.remove("d-none");
}

function changeMessageBoxVisibility(){
    if(shoppingListCounter > 0){
        sectionsPage[1].getElementsByClassName("my-messageBox")[0].classList.add("d-none");
    }else{
        sectionsPage[1].getElementsByClassName("my-messageBox")[0].classList.remove("d-none");
    }

    if(trashListCounter > 0){
        sectionsPage[2].getElementsByClassName("my-messageBox")[0].classList.add("d-none");
    }else{
        sectionsPage[2].getElementsByClassName("my-messageBox")[0].classList.remove("d-none");
    }

    localStorage.newIdCounter = newIdCounter;
    localStorage.trashListCounter = trashListCounter;
    localStorage.shoppingListCounter = shoppingListCounter;
    console.log("newIdCounter: ", localStorage.newIdCounter);
}

function clickAllElementInTheBox(sectionId){
    let rowList = sectionsPage[sectionId].getElementsByClassName("my-rowList");
    rowList = Array.from(rowList);
    console.log(rowList.length);
    for (row of rowList) {
        row.click();
    }
}

function deleteText(){
    document.getElementById("my-textarea").value = "";
}

function addAllElementOnStorage(){
    for (textAndId of shopListTexts){
        let onlyText = textAndId.split(mySpecialChar)[0];

        let boxElement = sectionsPage[1].getElementsByClassName("my-boxList")[0];

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="shop-${newIdCounter}" onclick="addElementToList(2, '${onlyText}'); cancelElementToList(1, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9 text-break">
                ${onlyText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-square-check fs-3"></i>
            </a>
        </div>
        `;
    }
    for (textAndId of trashListTexts){
        let onlyText = textAndId.split(mySpecialChar)[0];
        
        let boxElement = sectionsPage[2].getElementsByClassName("my-boxList")[0];

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="trash-${newIdCounter}" onclick="addElementToList(-1, '${onlyText}'); cancelElementToList(2, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9 text-break">
                ${onlyText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
            </a>
        </div>
        `;
    }

    changeMessageBoxVisibility();
}