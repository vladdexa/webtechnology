import {generateRssFeed} from "../controllers";


const Router = require('router');
const router = Router();

router.get('/', generateRssFeed);

export = router;
