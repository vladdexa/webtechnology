import { login } from "../controllers"
import bodyParser from "body-parser"
import { render } from "../Utils"
const Router = require('router');
const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req: any, res: any) => {
    res.writeHead(404, { 'Content-Type': 'text/json' });
    const responseObj = {
        message: 'Route not found.'
    }

    res.end(JSON.stringify(responseObj));
})

router.get('/login', (req: any, res: any) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const loginPageHtmlPath = 'D:\\proiectTW\\Pages\\LoginPage\\auth.html';
    render(res, loginPageHtmlPath);
})

router.post('/login', urlencodedParser, login);

export = router;