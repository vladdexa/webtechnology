import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
import { getProductsBySearchInput} from '../controllers';
import bodyParser from "body-parser"

const Router = require('router');

const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const searchProductsPageHtmlPath= '../Pages/SearchProductsPage/searchProducts.html';
    render(res,searchProductsPageHtmlPath);
})

router.post('/menu-search',urlencodedParser,getProductsBySearchInput);

export = router
