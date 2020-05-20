import HttpStatus from 'http-status-codes'
import {render} from "../Utils";

const Router = require('router');

const router = Router();

router.get('/', (req:any,res:any) => {
    res.writeHead(HttpStatus.OK, {'Content-Type':'text/html'});
    const adminPage = '../Pages/Admin/AdminPage.html';
    render(res, adminPage);
});

export = router;
