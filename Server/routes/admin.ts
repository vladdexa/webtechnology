import HttpStatus from 'http-status-codes'

const Router = require('router');

const router = Router();

router.get('/', (req:any,res:any) => {
    res.writeHead(HttpStatus.OK, {'Content-Type':'text/html'});
    res.end('Welcome to admin page');
})

export = router;