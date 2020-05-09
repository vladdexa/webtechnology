import {authorizer} from "../../Components/Generics/authorizer.js";

const getUser = async() => {

    const userId = authorizer();
    if(userId) {
        const response = await fetch('http://localhost:3000/user/get-user-byId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userId=${userId}`
        });

        return await response.json();
    }
};

const renderUserPage = async () => {

    const user = await getUser();

    const credentials = document.getElementById('#credentials');
    credentials.innerText = user.firstName + " " + user.lastName;

    const username = document.getElementById('#username');
    username.innerText = "Username:" + user.username;

    const email = document.getElementById('#email');
    email.innerText = "E-mail " + user.email;
}

const goToHomePage = async ()=> {

    if (authorizer()) {
        window.location.assign("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }

}


const onLoad = async()=> {

    const backToHomePageBtn = document.getElementById('back-btn');
    backToHomePageBtn.addEventListener('click', goToHomePage);
    await renderUserPage();

}

document.getElementById('#body').addEventListener('load', onLoad());

let email;
let generatedPassword;

const sendEmail = async() => {
    email = document.getElementById('email').value;
    const reset = 'reset';
    const invalidEmailFormat = "Invalid email format";
    const successfullySent = "We sent a new password on e-mail";

    if (email) {
        const response = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}&reset=${reset}`
        });

        const messageFromServer = await response.json();
        generatedPassword = messageFromServer.gPass;


        if (!messageFromServer.message.localeCompare(invalidEmailFormat)) {
            alert(invalidEmailFormat);
        } else if (!messageFromServer.message.localeCompare(successfullySent)) {
            alert(successfullySent);
        }
    } else {
        alert('You must complete e-mail field.');
    }

};


const sendNewPassword = async() => {
    const sentPassword = document.getElementById('sentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const change = 'change';

    const invalidSentPassword = "Sent password does not correspond";
    const newPasswordNotRightLength = "New password is not the right length. It must contain 5-50 characters.";
    const newPasswordNotUpperLetters = "New password does not contain upper case letters";
    const newPasswordNotLowerLetters = "New password does not contain lower case letters";
    const successfullyChangedPassword = "Successfully changed password";


    if (sentPassword && newPassword) {
        const response = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `sentPassword=${sentPassword}&newPassword=${newPassword}&email=${email}&change=${change}&genPass=${generatedPassword}`
        });

        const messageFromServer = await response.json();

        switch (messageFromServer.message) {
            case invalidSentPassword:
                {
                    alert(invalidSentPassword);
                    break;
                }
            case newPasswordNotRightLength:
                {
                    alert(newPasswordNotRightLength);
                    break;
                }
            case newPasswordNotUpperLetters:
                {
                    alert(newPasswordNotUpperLetters);
                    break;
                }
            case newPasswordNotLowerLetters:
                {
                    alert(newPasswordNotLowerLetters);
                    break;
                }
            case successfullyChangedPassword:
                {
                    alert(successfullyChangedPassword);
                    window.location.replace("http://localhost:3000/user");
                    break;
                }
        }

    } else {
        alert('You must complete Sent Password and New Password fields.');
    }

};
