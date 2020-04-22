const Router = require('router');

const router = Router();

router.get('/', (req: any, res: any) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to HomePage')
})

export = router