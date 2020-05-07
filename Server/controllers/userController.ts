import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/entities/User";
import HttpStatus from 'http-status-codes'

async function getUserById(req:any,res:any) {
    const userId:number = req.body.userId;

    const userRepository = new UserRepository();
    const user:User = (await userRepository.getById(userId))[0];

    res.writeHead(HttpStatus.OK, {'Content-Type':'application/json'});
    const response = {
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }

    res.end(JSON.stringify(response));

}

export {getUserById}