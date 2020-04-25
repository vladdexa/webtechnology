// async function handleSubmit() {
//     const username = document.getElementById('#username').value;
//     const password = document.getElementById('#password').value;

//     if (username && password) {
//         const url = 'http://localhost:3000/auth/login';
//         const response = await fetch(url, {
//             method: 'POST', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, *cors, same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json'
//                     // 'Content-Type': 'application/x-www-form-urlencoded',

//             },
//             body: JSON.stringify({
//                 username,
//                 password
//             })
//         });

//         console.log(response);
//         return response.json();

//     }
//     const form = document.getElementById('#loginForm');

// }