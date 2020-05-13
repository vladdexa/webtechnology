import {Storage} from "@google-cloud/storage";
import {configs} from "../../configs";

const path = require('path');

const serviceKey = path.join(__dirname, './storageConfig.json');

export const config = new Storage({
    keyFilename: serviceKey,
    projectId: configs.projectId,

});

export const bucketName = 'toys-1';
