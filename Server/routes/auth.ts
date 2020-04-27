import  {login,register,forgotPass}  from "../controllers"
import bodyParser from "body-parser"
import { render } from "../Utils"
import HttpStatus from 'http-status-codes'
const Router = require('router');
const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.NOT_FOUND, { 'Content-Type': 'text/json' });
    const responseObj = {
        message: 'Route not found.'
    }

    res.end(JSON.stringify(responseObj));
})

router.get('/login', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const loginPageHtmlPath = '../Pages/LoginPage/auth.html';
    render(res, loginPageHtmlPath);
})

router.get('/register', (req:any,res:any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const registerPageHtmlPath = '../Components/RegisterComponents/registerForm.html';
    render(res, registerPageHtmlPath);
})

router.get('/forgot-password', (req:any,res:any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const forgotPasswordPageHtmlPath = '../Components/ForgotPasswordComponent/forgotPasswordForm.html';
    render(res, forgotPasswordPageHtmlPath);
})

router.post('/login', urlencodedParser, login);
router.post('/register',urlencodedParser,register);
router.post('/forgot-password',urlencodedParser,forgotPass);

export = router;
