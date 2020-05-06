import HttpStatus from 'http-status-codes'
import auth from "./auth";
import home from "./home"
import admin from "./admin"
import product from "./product"
import order from './order'
import search from './search'
import user from "./user"

const Router  = require('router');

const router = Router();

router.get('/', (req:any,res:any) => {
   res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/json' });
    const responseObj = {
       status:'active'
    }
    
    res.end(JSON.stringify(responseObj));
})

router.use('/auth',auth);
router.use('/home',home);
router.use('/admin',admin);
router.use('/product',product);
router.use('/order',order);
router.use('/search',search);
router.use('/user',user);

export = router;
