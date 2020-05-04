
// async function getUser() {

//     const 
// }

 function renderUserPage() {

    const credentials = document.getElementById('#credentials');
    credentials.innerText = "brinza tiberiu";

    const username = document.getElementById('#username');
    username.innerText = "brinzatib";

    const email = document.getElementById('#email');
    email.innerText = "birnzatib@gmail.com";
}


function onLoad() {
    renderUserPage();

}