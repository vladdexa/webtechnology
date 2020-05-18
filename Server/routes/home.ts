import HttpStatus from 'http-status-codes'
import {render} from '../Utils'
import { getImagesForCarousels, getCategories,createStatistics} from '../controllers';

const Router = require('router');

const router = Router();


router.get('/', (req: any, res: any) => {
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html' });
    const homePageHtmlPath= '../Pages/Homepage/homepageLayout.html';
    render(res,homePageHtmlPath);
})

router.get('/carousel-images',getImagesForCarousels);
router.get('/categories', getCategories);
router.get('/getStatistics', createStatistics);
export = router
