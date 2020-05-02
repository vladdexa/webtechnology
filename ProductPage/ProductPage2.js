let slideIndex = 1;

//buttonInput is left or right(-1 sau 1)

function plusSlideIndex(buttonInput) {
    displayImages(slideIndex += buttonInput);
}

function displayImages(buttonInput) {

    let Images = document.getElementsByClassName("get-img");
    if (buttonInput > Images.length) { slideIndex = 1 }
    if (buttonInput < 1) { slideIndex = Images.length }
    for (let index = 0; index < Images.length; index++) {
        Images[index].style.display = "none";
    }
    Images[slideIndex - 1].style.display = "block";
}