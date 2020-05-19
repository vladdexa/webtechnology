import HttpStatus from 'http-status-codes'
import { render } from '../Utils';
import { getUserById } from '../controllers'
const Router = require('router');

const router = Router();



router.get('/',(req:any,res:any) => {
    res.writeHead(HttpStatus.OK, {'Content-Type': 'text/html'});
    const userPageHtmlPath = '../Pages/UserPage/UserPage.html';
    render(res, userPageHtmlPath);
})

router.get('/get-user-byId',getUserById);

export = router