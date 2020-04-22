import http from "http"
import routerFrom from "./routes"
import { configs } from './configs'
import { Render } from "./Utils";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./models/entities/User";


const finalhandler = require('finalhandler');
const path = require('path');
const Router = require('router');

const router = Router();

const server = http.createServer((req: any, res: any) => {
    router(req, res, finalhandler(req, res))


    if (req.url.match("\.css$")) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        Render(req.url, res);
    }
    else if (req.url.match("\.png$") || req.url.match("\.jpg$")) {

        const type: string = path.basename(req.url).slice(1);
        res.writeHead(200, { 'Content-Type': `image/${type}` });
        Render(req.url, res);

    } else if (req.url.match("\.js$")) {

        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        Render(req.url, res);

    } else if (req.url.match("\.html$")) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        Render(req.url, res);

    }

})

router.use('/', routerFrom);


server.listen(configs.PORT, () => {
    console.log(`App is listening on port: ${configs.PORT}`);
})


