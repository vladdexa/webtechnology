import { UserRepository } from '../repositories/UserRepository';
import HttpStatus from 'http-status-codes'
import passwordHash from 'password-hash'
import { User } from '../models/entities/User';

async function login(req: any, res: any) {

    const body: any = req.body;
    const username: string = body.username;
    const password: string = body.password;


    const userRepository = new UserRepository();
    const user = await userRepository.getByUsername(username);


    if (user.length) {
        const role: string = user[0].role;
        const hashedPassword: string = user[0].password;


        if (passwordHash.verify(password, hashedPassword)) {
            if (role.localeCompare('user') === 0) {
                res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
                const response = {
                    message:'user'
                }
                res.end(JSON.stringify(response));

            }
            if(role.localeCompare('admin') === 0){
                res.writeHead(HttpStatus.OK,  { 'Content-Type': 'application/json' });
                const response = {
                    message:'admin'
                }
                res.end(JSON.stringify(response));
            }

        } else {
            res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
                const response = {
                    message:'Incorrect password'
                }
                res.end(JSON.stringify(response));
        }
    } else {
        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message:'User not found'
        }
        res.end(JSON.stringify(response));
    }

}

async function register(req: any, res: any) {
    const body: any = req.body;
    const firstName: string = body.firstName;
    const lastName: string = body.lastName;
    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;
    const role: string = 'user';

    const newUser: User = new User();
    const regexpEmail = new RegExp(/[a-zA-Z0-9_\\.\\+-]+@+[a-z].com|/);

    if (username.length < 5 || username.length > 50) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message:"Username is not the right length. It must contain 5-50 characters"
        }
        res.end(JSON.stringify(response));
    }
    newUser.username = username;

    if (password.toString().length < 5 || password.toString().length > 50) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message: "Password is not the right length. It must contain 5-50 characters."
        }
        res.end(JSON.stringify(response));
    }
 

    if (password.localeCompare(password.toUpperCase()) == 0) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message: "Password does not contain lower case letters"
        }
        res.end(JSON.stringify(response));
    }

    if (password.localeCompare(password.toLowerCase()) == 0) {

        
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message: "Password does not contain upper case letters"
        }
        res.end(JSON.stringify(response));

    }
    const hashedPassword: string = passwordHash.generate(password);
    newUser.password = hashedPassword;

    if (firstName.toString().length < 3 || firstName.toString().length > 50) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message: "First Name not the right length. It must contain 3-50 characters"
        }
        res.end(JSON.stringify(response));

    }
    newUser.firstName = firstName;

    if (lastName.toString().length < 3 || lastName.toString().length > 50) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message:"Last Name not the right length. It must contain 3-50 characters"
        }
        res.end(JSON.stringify(response));

    }
    newUser.lastName = lastName;

    if (!regexpEmail.test(email)) {

        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message:"Email not valid"
        }
        res.end(JSON.stringify(response));
    }
    newUser.email = email;

    newUser.role = role;


    const userRepository = new UserRepository();
    const user = await userRepository.getByUsername(username);

    if(user.length) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response  = {
            message:"Username already exist"
        }
        res.end(JSON.stringify(response));
    } else {
       await userRepository.create(newUser);
        res.writeHead(HttpStatus.OK, {'Content-Type':'application/json'});
        const response  = {
            message:"register successfully"
        }
        res.end(JSON.stringify(response));
    }

}


export { login, register }
