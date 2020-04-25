import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
const Router = require('router');

const router = Router();

router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    // res.end('Welcome to HomePage')
    const page= '../Pages/Homepage/homepageLayout.html';
    render(res,page);
})

export = router
