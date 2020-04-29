const sendData = async() => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userNotFound = 'User not found';
    const incorrectPassword = 'Incorrect password';
    const user = 'user';
    const admin = 'admin';

    console.log(username.toString(), password.toString());

    if (username && password) {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`
        });

        const messageFromServer = await response.json();
        console.log(messageFromServer.message);

        switch (messageFromServer.message) {

            case userNotFound:
                {
                    alert(userNotFound);
                    break;
                }
            case incorrectPassword:
                {
                    alert(incorrectPassword);
                    break;
                }
            case user:
                {
                    window.location.replace("http://localhost:3000/home");
                    break;
                }
            case admin:
                {
                    window.location.replace("http://localhost:3000/admin");
                    break;
                }
        }
    } else {
        alert('You must complete all fields.');
    }

};