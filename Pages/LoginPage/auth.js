
const logdata = async ()=> {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username.toString(), password.toString());

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: `username=${username}&password=${password}` // body data type must match "Content-Type" header
    });
   const responseError = await response.json();
   alert(responseError.message);
};


