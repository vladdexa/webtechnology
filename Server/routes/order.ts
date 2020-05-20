import HttpStatus from 'http-status-codes'
import { render } from '../Utils';
import bodyParser from 'body-parser';
import {getProductsForShoppingCart,deleteProductFromShoppingCart, placeYourOrder} from '../controllers'

const Router = require('router');
const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req:any,res:any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const orderPageHtmlPath = '../Pages/OrderPage/orderPage.html';
    render(res, orderPageHtmlPath);
})


router.get('/get-products-shopping-cart',getProductsForShoppingCart);
router.delete('/delete-product-from-shoppingCart',urlencodedParser,deleteProductFromShoppingCart);
router.post('/place-your-order',bodyParser.json(), placeYourOrder);

export = router
