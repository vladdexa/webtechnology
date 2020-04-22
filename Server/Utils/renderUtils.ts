import fs from 'fs';
import { configs } from '../configs'

const path = require('path');
const lineReader = require('line-reader');

function render(res: any, FilePath: string) {
    fs.stat(FilePath, (error: any, stats: any) => {
        if (stats) {
            fs.createReadStream(FilePath).pipe(res);
        }
        else {
            throw new Error(error?.message);
        }
    });
}


function Render(url: string, res: any) {
    const bsn: string = path.basename(url);
    lineReader.eachLine(configs.paths, (path: string) => {
        if (path.match(bsn)) {
            render(res, path);
            return false;
        }
    })
}


export { Render, render }