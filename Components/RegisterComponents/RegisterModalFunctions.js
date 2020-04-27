function loadRegisterPage() {
    window.location.replace("http://localhost:3000/auth/register");
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
    const emailNotValid = "Invalid email format";
    const usernameAlreadyExists = "Username already exists";
    const registerSuccessfully = "register successfully";
    const emailAlreadyExists = "Email already exists";


    console.log(firstName.toString(), lastName.toString(), email.toString(), username.toString(), password.toString());


    if (username && password && firstName && lastName && email) {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `firstName=${firstName}&lastName=${lastName}&email=${email}&username=${username}&password=${password}`
        });

        const messageFromServer = await response.json();
        console.log(messageFromServer.message);

        switch (messageFromServer.message) {

            case usernameNotRightLength:
                {
                    alert(usernameNotRightLength);
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
            case usernameAlreadyExists:
                {
                    alert(usernameAlreadyExist);
                    break;
                }
            case registerSuccessfully:
                {
                    alert(registerSuccessfully);
                    window.location.replace("http://localhost:3000/auth/login");
                    break;
                }
            case emailAlreadyExists:
                {
                    alert(emailAlreadyExists);
                    break;
                }
        }
    } else {
        alert('You must complete all fields.');
    }

};