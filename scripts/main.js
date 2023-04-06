const addSectionBtn = document.getElementById("my-addSectionBtn");
const listSectionBtn = document.getElementById("my-listSectionBtn");
const trashSectionBtn = document.getElementById("my-trashSectionBtn");
const footerButtons = [addSectionBtn, listSectionBtn, trashSectionBtn];

const addSection = document.getElementById("my-addSection");
const listSection = document.getElementById("my-listSection");
const trashSection = document.getElementById("my-trashSection");
const sectionsPage = [addSection, listSection, trashSection];

let shoppingListCounter = 0;
let trashListCounter = 0;


function addElementToList(sectionOrder, trashText){
    if (sectionOrder == 1) {
        let text = document.getElementById("my-textarea").value;
        let shoppingListTexts = text.split("\n");
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];

        if (text != "") {
            for (listText of shoppingListTexts) {
                boxElement.innerHTML += `
            <div class="my-rowList d-flex justify-content-between align-items-center p-2" onclick="addElementToList(2, '${listText}')">
                <p class="text-white m-0">
                    ${listText}
                </p>
                <a class="my-iconButton my-mainButton">
                    <i class="fa-solid fa-square-check fs-3"></i>
                </a>
            </div>
            `;
                shoppingListCounter += 1;
            }

            document.getElementById("my-textarea").value = "";
            changeMessageBoxVisibility();
        }
    } else {
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];
        boxElement.innerHTML += `
        <div class="my-firstRowList my-rowList d-flex justify-content-between align-items-center p-2">
            <p class="text-white m-0">
                ${trashText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
            </a>
        </div>
            `;
        trashListCounter += 1;

        changeMessageBoxVisibility();
    }

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
}
