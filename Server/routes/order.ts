import HttpStatus from 'http-status-codes'
import { render } from '../Utils';
import bodyParser from 'body-parser';
import {getProductsForShoppingCart,deleteProductFromShoppingCart} from '../controllers'

const Router = require('router');
const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req:any,res:any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const orderPageHtmlPath = '../Pages/OrderPage/orderPage.html';
    render(res, orderPageHtmlPath);
})

router.post('/get-products-shopping-cart',urlencodedParser, getProductsForShoppingCart);
router.post('/delete-product-from-shoppingCart',urlencodedParser,deleteProductFromShoppingCart)

export = router