import http from "http"
import routerFrom from "./routes"
import { configs } from './configs'
import { Render } from "./Utils";
import "reflect-metadata";
import { createConnection } from "typeorm";
import HttpStatus from 'http-status-codes'



const finalhandler = require('finalhandler');
const path = require('path');
const Router = require('router');

const router = Router();

createConnection().then(async () => {

    const server = http.createServer((req: any, res: any) => {
        router(req, res, finalhandler(req, res))


        if (req.url.match("\.css$")) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/css', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);
        }
        else if (req.url.match("\.png$") || req.url.match("\.jpg$") ) {

            const basename:string = path.basename(req.url);
            const type: string = basename.slice(basename.indexOf(".")+1);

            res.writeHead(HttpStatus.OK, { 'Content-Type': `image/${type}`, 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);

        } else if (req.url.match("\.js$")) {

            res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/javascript', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);

        } else if (req.url.match("\.html$")) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);

        } else if(req.url.match("\.otf$")) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/otf', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);
        } else if(req.url.match("\.json$")) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);
        } else if(req.url.match("\.svg$")) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);
        } else if(req.url.match('\.xml$')) {
            res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=31536000' });
            Render(req.url, res);
        }


    });

    router.use('/', routerFrom);


    server.listen(configs.PORT, () => {
        console.log(`App is listening on port: ${configs.PORT}`);
    })


}).catch(error => {
    console.log(error);
})


