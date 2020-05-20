import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
import {getProductsByCategoryId} from "../controllers";
import bodyParser from "body-parser"
import {createCategory} from "../controllers/";

const Router = require('router');

const router = Router();


router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const homePageHtmlPath= '../Pages/CategoryPage/categoryPage.html';
    render(res,homePageHtmlPath);
});

router.get('/getProductsByCategoryId',getProductsByCategoryId);
router.post('/create', bodyParser.json(), createCategory);

export = router
