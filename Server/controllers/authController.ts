import { UserRepository } from '../repositories/UserRepository';
import HttpStatus from 'http-status-codes'
import passwordHash from 'password-hash'
import { User } from '../models/entities/User';

async function login(req: any, res: any) {

    const body: any = req.body;
    const username: string = body.username;
    const password: string = body.password;

    console.log(username +" " + password);

    const userRepository = new UserRepository();
    const user = await userRepository.getByUsername(username);
    const role: string = user[0].role;
    const hashedPassword: string = user[0].password;

    if (user.length) {
        if (passwordHash.verify(password, hashedPassword)) {
            if (role.localeCompare('user') === 0) {
              // res.writeHead(HttpStatus.MOVED_PERMANENTLY, { Location: 'http://localhost:3000/auth/home' });
               //res.writeHead(HttpStatus.OK)
                //res.end(JSON.stringify(user));

                
                const response  = {
                            message:'username not found'
                        }
             //res.end();
              

            }
            else {
                res.writeHead(HttpStatus.MOVED_PERMANENTLY, { Location: 'http://localhost:3000/admin' });
                res.end();
            }

        }
    } 
    
    // console.log(user);
    
     
    //     res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});

    //     const response  = {
    //         message:'username not found'
    //     }
    //     res.write
    //     res.on('end', () => response)

        //res.end(JSON.stringify(response));
    
}

async function register(req: any, res: any) {
    const body: any = req.body;
    const firstName: string = body.firstName;
    const lastName: string = body.lastName;
    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;
    const role: string = 'user';

    const hashedPassword: string = passwordHash.generate(password);

    const newUser: User = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.role = role;


    const userRepository = new UserRepository();

    userRepository.create(newUser);

    res.writeHead(HttpStatus.MOVED_PERMANENTLY, { Location: 'http://localhost:3000/auth/login' });
    res.end();



}


export { login, register }