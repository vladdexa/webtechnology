import {API_VERSION, apiKey, bucket, clientId } from "./GoogleCloudConfig.js";

export class ImageUploaderService {
    constructor() {
        this.apiKey = apiKey;
        this.clientId = clientId;
        this.scope = 'https://www.googleapis.com/auth/devstorage.full_control';
        this.apiVersion = API_VERSION;
        this.bucket = bucket;
        this.delimiters = {
            boundary: '-------314159265358979323846',
            delimiter: '\r\n--' + '-------314159265358979323846' + '\r\n',
            closeDelimiter: '\r\n--' + '-------314159265358979323846' + '--',
        };
        this.file = {
            contentType: 'application/octet-stream',
            metadata: {
                'name': '',
                'mimeType': 'application/octet-stream',
            },
            fileToBase64: '',
            size: 0,
        };
    };

  authorization() {
     gapi.client.setApiKey(this.apiKey);
     gapi.auth.authorize({
         client_id: this.clientId,
         scope: this.scope,
         immediate: false,
     }, async (authResult)=>{
         if(authResult && !authResult.error) {
             alert('Auth was successfull');
             await this.initializeApi();
         } else {
             alert('Auth was not successfull');
         }
     })
 }

 initializeApi() {
     gapi.client.load('storage', this.apiVersion);
 }

   async  getFile(file) {
        const reader = new FileReader();
        await reader.readAsBinaryString(file);
        const size = file.size;
        const contentType = file.type || 'application/octet-stream';
        const metadata =  {
            'name': file.name,
            'mimeType': contentType,
            'Content-Type': contentType,
            'Content-Length': size,
        };
        const result = btoa(reader.result);

        this.file = {
            size,
            contentType,
            metadata,
            fileToBase64: result,
        };
    };

    createRequest(locationUrl) {

        const request =
            this.delimiters.delimiter
            +
            'Content-Type: application/json\r\n\r\n'
            +
            JSON.stringify(this.file.metadata)
            +
            this.delimiters.delimiter
            +
            'Content-Type: ' + this.file.contentType
            +
            '\r\n'
            +
            'Content-Transfer-Encoding: base64\r\n'
            +
            '\r\n'
            +
            this.file.fileToBase64
            +
            this.delimiters.closeDelimiter
        ;
        const requestPost = gapi.client.request({
            'path': locationUrl,
            'method': 'PUT',
            'headers' : {
                'X-Upload-Content-Length' : this.file.size,
                'Content-Type': 'multipart/related; boundary="' + this.delimiters.boundary + '"'
            },
            'body' : request
        });

        requestPost.execute((response)=>{
            console.log(response);
        })
    }

    uploadImage() {

        const request = gapi.client.request({
            'path': '/upload/storage/v1/b/' + this.bucket + '/o',
            'method': 'POST',
            'params': {'uploadType': 'resumable'},
            'headers': {
                'X-Upload-Content-Type' : this.file.contentType,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            'body' : this.file.metadata,
        });

        try {
            request.execute((resp, raw_resp)=> {
                    console.log(resp);
                    const locationUrl =  '/upload/storage/v1/b/' + this.bucket + '/o';
                    console.log(locationUrl);
                    this.createRequest(locationUrl);
            })
        } catch(error) {
            alert(error);
        }
    }
}
