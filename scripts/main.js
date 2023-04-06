const addSectionBtn = document.getElementById("my-addSectionBtn");
const listSectionBtn = document.getElementById("my-listSectionBtn");
const trashSectionBtn = document.getElementById("my-trashSectionBtn");
const footerButtons = [addSectionBtn, listSectionBtn, trashSectionBtn];

const addSection = document.getElementById("my-addSection");
const listSection = document.getElementById("my-listSection");
const trashSection = document.getElementById("my-trashSection");
const sectionsPage = [addSection, listSection, trashSection];

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
