import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
import { getProductsBySearchInput} from '../controllers';

const Router = require('router');

const router = Router();


router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const searchProductsPageHtmlPath= '../Pages/SearchProductsPage/searchProducts.html';
    render(res,searchProductsPageHtmlPath);
})

router.get('/menu-search',getProductsBySearchInput);

export = router
