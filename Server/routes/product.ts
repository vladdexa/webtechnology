import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
import bodyParser from 'body-parser';
import {getProduct,getProductsPicturesByCategory,addProductToShoppingCart, createProduct} from '../controllers'
const Router = require('router');

const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req:any,res:any) => {
    res.writeHead(HttpStatus.OK, {'Content-Type':'text/html'});
    const productPageHtmlPath = '../ProductPage/ProductPage.html';
    render(res,productPageHtmlPath);
})

router.post('/', urlencodedParser,getProduct);
router.post('/products-byCategory',urlencodedParser,getProductsPicturesByCategory);
router.post('/add-product-shoppingCart',urlencodedParser,addProductToShoppingCart);
router.post('/create', bodyParser.json(), createProduct);

export = router
