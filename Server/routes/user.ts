import HttpStatus from 'http-status-codes'
import { render } from '../Utils';
import bodyParser from 'body-parser'
import { getUserById } from '../controllers'
const Router = require('router');

const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req:any,res:any) => {
    res.writeHead(HttpStatus.OK, {'Content-Type': 'text/html'});
    const userPageHtmlPath = '../Pages/UserPage/UserPage.html';
    render(res, userPageHtmlPath);
})

router.post('/get-user-byId',urlencodedParser,getUserById);

export = router