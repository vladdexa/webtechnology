const type = 'register';

async function createRegisterModal() {
    const modal = new Modal(type);
    await modal.createModalContent();
    modal.openModal();
}

function closeRegisterModal() {
    const modal = document.getElementById('#modal');
    const loginForm = document.getElementById('#loginForm');

    try {
        modal.style.display = 'none';
        loginForm.style.display = 'flex';
        modal.parentNode.removeChild(modal);


    } catch (e) {
        throw new Error(e);
    }
}



const sendata = async() => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;


    const usernameNotRightLength = "Username is not the right length. It must contain 5-50 characters";
    const passwordNotRightLength = "Password is not the right length. It must contain 5-50 characters.";
    const passwordNotUpperLetters = "Password does not contain upper case letters";
    const passwordNotLowerLetters = "Password does not contain lower case letters";
    const firstNameNotRightLength = "First Name not the right length. It must contain 3-50 characters";
    const lastNameNotRightLength = "Last Name not the right length. It must contain 3-50 characters";
    const emailNotValid = "Email not valid";
    const usernameAlreadyExist = "Username already exist";
    const registerSuccessfully = "register successfully";


    console.log(username.toString(), password.toString(), firstName.toString(), lastName.toString(), email.toString());


    if (username && password && firstName && lastName && email) {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: `username=${username}&password=${password}}&firstName=${firstName}}&lastName=${lastName}}&email=${email}`
        });

        const messageFromServer = await response.json();
        console.log(messageFromServer.message);

        switch (messageFromServer.message) {

            case usernameNotRightLength:
                {
                    alert(usernameNotRightLength);
                    window.location.replace("http://localhost:3000/auth/register");
                    break;
                }
            case passwordNotRightLength:
                {
                    alert(passwordNotRightLength);
                    break;
                }
            case passwordNotUpperLetters:
                {
                    alert(passwordNotUpperLetters);
                    break;
                }
            case passwordNotLowerLetters:
                {
                    alert(passwordNotLowerLetters);
                    break;
                }
            case firstNameNotRightLength:
                {
                    alert(firstNameNotRightLength);
                    break;
                }
            case lastNameNotRightLength:
                {
                    alert(lastNameNotRightLength);
                    break;
                }
            case emailNotValid:
                {
                    alert(emailNotValid);
                    break;
                }
            case usernameAlreadyExist:
                {
                    alert(usernameAlreadyExist);
                    break;
                }
            case registerSuccessfully:
                {
                    alert(registerSuccessfully);
                    break;
                }
        }
    } else {
        alert('You must complete all fields.');
    }

};