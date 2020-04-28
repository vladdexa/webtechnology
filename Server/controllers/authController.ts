import { UserRepository } from '../repositories/UserRepository';
import HttpStatus from 'http-status-codes'
import passwordHash from 'password-hash'
import { User } from '../models/entities/User';
import passwordGenerator from 'password-generator'

const nodemailer = require('nodemailer');

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
                    message: 'user'
                }
                res.end(JSON.stringify(response));

            }
            if (role.localeCompare('admin') === 0) {
                res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
                const response = {
                    message: 'admin'
                }
                res.end(JSON.stringify(response));
            }

        } else {
            res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
            const response = {
                message: 'Incorrect password'
            }
            res.end(JSON.stringify(response));
        }
    } else {
        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: 'User not found'
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

    let ok: boolean = true;

    console.log(firstName);
    console.log(lastName);

    console.log(email);


    const newUser: User = new User();
    const regexpEmail = new RegExp(/[a-zA-Z0-9_\\.\\+-]+@[a-z]+[\\.][a-z]/);

    if (username.length < 5 || username.length > 50) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Username is not the right length. It must contain 5-50 characters"
        }
        res.end(JSON.stringify(response));
    }
    newUser.username = username;

    if (password.length < 5 || password.length > 50) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Password is not the right length. It must contain 5-50 characters."
        }
        res.end(JSON.stringify(response));
    }


    if (password.localeCompare(password.toUpperCase()) == 0) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Password does not contain lower case letters"
        }
        res.end(JSON.stringify(response));
    }

    if (password.localeCompare(password.toLowerCase()) == 0) {
        ok = false;


        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Password does not contain upper case letters"
        }
        res.end(JSON.stringify(response));

    }
    const hashedPassword: string = passwordHash.generate(password);
    newUser.password = hashedPassword;

    if (firstName.length < 3 || firstName.length > 50) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "First Name not the right length. It must contain 3-50 characters"
        }
        res.end(JSON.stringify(response));

    }
    newUser.firstName = firstName;

    if (lastName.length < 3 || lastName.length > 50) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Last Name not the right length. It must contain 3-50 characters"
        }
        res.end(JSON.stringify(response));

    }
    newUser.lastName = lastName;

    if (!regexpEmail.test(email)) {
        ok = false;

        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Invalid email format"
        }
        res.end(JSON.stringify(response));
    }
    newUser.email = email;

    newUser.role = role;


    const userRepository = new UserRepository();
    const userByUsername = await userRepository.getByUsername(username);
    const userByEmail = await userRepository.getByEmail(email);

    if (userByUsername.length) {
        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Username already exists"
        }
        res.end(JSON.stringify(response));
    } else if (userByEmail.length) {
        res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
        const response = {
            message: "Email already exists"
        }
        res.end(JSON.stringify(response));
    }
    else if (ok) {
        await userRepository.create(newUser);
        res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
        const response = {
            message: "register successfully"
        }
        res.end(JSON.stringify(response));
    }

}

async function forgotPass(req: any, res: any) {
    const body = req.body;

    const email: string = body.email;
    const sentPassword: string = body.sentPassword;
    const newPassword: string = body.newPassword;
    const reset: string = body.reset;
    const change: string = body.change;
    const genPass: string = body.genPass;


    let ok: boolean = true;
    const regexpEmail = new RegExp(/[a-zA-Z0-9_\\.\\+-]+@[a-z]+[\\.][a-z]/);

    if (email && reset) {
        if (!regexpEmail.test(email)) {

            res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
            const response = {
                message: "Invalid email format"
            }
            res.end(JSON.stringify(response));
        } else {
            const generatedPassword = passwordGenerator();
            console.log(generatedPassword);


            const transporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth: {
                        user: 'twonlinetoys@gmail.com',
                        pass: 'Asdfg.123',
                    }
                }

            );

            const info = await transporter.sendMail({
                to: email,
                subject: 'Online Toys forgot password service',
                text: generatedPassword,
            }).catch(console.error);

            console.log(info);


            res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
            const response = {
                message: "We sent a new password on e-mail",
                gPass: generatedPassword
            }
            res.end(JSON.stringify(response));
        }

    }

    if (sentPassword && newPassword && change) {
        if (!sentPassword.localeCompare(genPass)) {

            if (newPassword.length < 5 || newPassword.length > 50) {
                ok = false;

                res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
                const response = {
                    message: "New password is not the right length. It must contain 5-50 characters."
                }
                res.end(JSON.stringify(response));
            }


            if (newPassword.localeCompare(newPassword.toUpperCase()) == 0) {
                ok = false;

                res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
                const response = {
                    message: "New password does not contain lower case letters"
                }
                res.end(JSON.stringify(response));
            }

            if (newPassword.localeCompare(newPassword.toLowerCase()) == 0) {
                ok = false;


                res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
                const response = {
                    message: "New password does not contain upper case letters"
                }
                res.end(JSON.stringify(response));

            }

            if (ok) {
                const hashedPassword: string = passwordHash.generate(newPassword);

                const userRepository = new UserRepository();
                const user = await userRepository.getByEmail(email);
                await userRepository.updatePassword(hashedPassword, user[0].id);

                res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
                const response = {
                    message: "Successfully changed password"
                }
                res.end(JSON.stringify(response));
            }

        } else {
            res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
            const response = {
                message: "Sent password does not correspond"
            }
            res.end(JSON.stringify(response));
        }
    }



}


export { login, register, forgotPass }
