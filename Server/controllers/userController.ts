import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/entities/User";
import HttpStatus from 'http-status-codes'
import URLparse from 'url-parse'

async function getUserById(req:any,res:any) {
    const url = URLparse(req.url,true);
    const userIdString: string | undefined = url.query.uid;

    if(userIdString !== undefined) {
        const userId:number = parseInt(userIdString, 10);
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
}

export {getUserById}