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
let newIdCounter = 0;

const pasteButton = document.getElementById('paste-button');

pasteButton.addEventListener('click', async () => {
   try {
     const text = await navigator.clipboard.readText();
     document.getElementById("my-textarea").focus();
     document.getElementById("my-textarea").value = text;
     console.log('Text pasted.');
   } catch (error) {
     console.log('Failed to read clipboard');
   }
});

// pasteButton.addEventListener('click', () => {
//     document.getElementById("my-textarea").focus();
//     document.getElementById("my-textarea").value = document.execCommand('paste');
// })


function addElementToList(sectionOrder, trashText){
    if (sectionOrder == 1) {
        let text = document.getElementById("my-textarea").value;
        let shoppingListTexts = text.split("\n");
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];

        if (text != "") {
            for (listText of shoppingListTexts) {
                shoppingListCounter += 1;
                newIdCounter += 1;

                boxElement.innerHTML += `
            <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="shop-${newIdCounter}" onclick="addElementToList(2, '${listText}'); cancelElementToList(1, ${newIdCounter})">
                <p class="text-start text-white m-0 ms-2 col-9">
                    ${listText}
                </p>
                <a class="my-iconButton my-mainButton">
                    <i class="fa-solid fa-square-check fs-3"></i>
                </a>
            </div>
            `;
            }

            document.getElementById("my-textarea").value = "";
        }
    }else if(sectionOrder == 2) {
        let boxElement = sectionsPage[sectionOrder].getElementsByClassName("my-boxList")[0];
        trashListCounter += 1;
        newIdCounter += 1;

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="trash-${newIdCounter}" onclick="addElementToList(-1, '${trashText}'); cancelElementToList(2, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9">
                ${trashText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
            </a>
        </div>
            `;
    }else{
        let boxElement = sectionsPage[1].getElementsByClassName("my-boxList")[0];
        shoppingListCounter += 1;
        newIdCounter += 1;

        boxElement.innerHTML += `
        <div class="my-rowList d-flex justify-content-between align-items-center p-2" id="shop-${newIdCounter}" onclick="addElementToList(2, '${trashText}'); cancelElementToList(1, ${newIdCounter})">
            <p class="text-start text-white m-0 ms-2 col-9">
                ${trashText}
            </p>
            <a class="my-iconButton my-mainButton">
                <i class="fa-solid fa-square-check fs-3"></i>
            </a>
        </div>
        `;
    }

    changeMessageBoxVisibility();
}
function resetList(idSection){
    let sectionElement;

    if(idSection == 1){
        sectionElement = document.getElementById("my-listSection");

        shoppingListCounter = 0;

    } else {
        sectionElement = document.getElementById("my-trashSection");

        trashListCounter = 0;
    }

    let rowList = sectionElement.getElementsByClassName("my-rowList");
    rowList = Array.from(rowList);
    console.log(rowList.length);
    for (row of rowList) {
        console.log(row);
        row.remove();
    }

    changeMessageBoxVisibility();
}

function cancelElementToList(idSection, idRow){
    let sectionName;
    if(idSection == 1){
        sectionName = "shop";
        shoppingListCounter -= 1;
    }else{
        sectionName = "trash";
        trashListCounter -= 1;
    }
    let boxElement = document.getElementById(`${sectionName}-${idRow}`);

    boxElement.remove();
    changeMessageBoxVisibility();
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
