import auth from "./auth";

const Router  = require('router');

const router = Router();

//404
router.get('/', (req:any,res:any) => {
   res.writeHead(200, { 'Content-Type': 'text/json' });
    const responseObj = {
       status:'active'
    }
    
    res.end(JSON.stringify(responseObj));
})

router.use('/auth',auth);


export = router;
