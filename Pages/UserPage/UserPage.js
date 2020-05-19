import { authorizer } from "../../Components/Generics/authorizer.js";

const getUser = async() => {

    const userId = authorizer();
    if (userId) {
        const response = await fetch(`http://localhost:3000/user/get-user-byId?uid=${userId}`);

        return await response.json();
    } else {
        alert('You do not have authorization for this action.');
    }

}

const renderUserPage = async() => {

    const user = await getUser();

    const credentials = document.getElementById('#credentials');
    credentials.innerText = user.firstName + " " + user.lastName;

    const username = document.getElementById('#username');
    username.innerText = "Username:" + user.username;

    const email = document.getElementById('#email');
    email.innerText = "E-mail " + user.email;
}

const goToHomePage = async() => {

    if (authorizer()) {
        window.location.assign("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }

}



const onLoad = async() => {

    const backToHomePageBtn = document.getElementById('back-btn');
    backToHomePageBtn.addEventListener('click', goToHomePage);
    await renderUserPage();

}

document.getElementById('#body').addEventListener('load', onLoad());