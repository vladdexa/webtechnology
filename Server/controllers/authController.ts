import { render } from '../Utils'

async function login(req: any, res: any) {

    console.log(req.body.username)
    console.log('yaayyyy');
    console.log(req.body.password);

    if(req.body.username === 'codrin' && req.body.password === 'codrinepure')
    {
        res.writeHead(301, {Location: 'http://localhost:3000/home'});
        // const user = {
        //     username:req.body.username,
        //     password:req.body.password
        // }
        // const homePagePath: string = 'D:\\proiectTW\\Pages\\Homepage\\homepageLayout.html';
        // render(res,homePagePath);
        //res.end(JSON.stringify(user));
        res.end();
    }

}


export = login;