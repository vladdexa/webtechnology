import {File, Storage} from "@google-cloud/storage";
import {bucketName, config} from "./GoogleCloudConfig";


 export class ImageUploader  {
    static allowedImageExtensions = ['png', 'jpg', 'jpeg', 'JPEG', 'PNG', 'JPG'];

    static isImageValid(image?: any): boolean {
        if (image) {
            const extension = ImageUploader.getExtension(image);

            return (
                ImageUploader.allowedImageExtensions.indexOf(extension) > -1
            );
        }
        return true;
    }

    static getExtension(image: any): string {
        return image.split('.').pop() || '';
    }

    static create() {
        return new ImageUploader();
    }

    private readonly storage: Storage;
    private readonly bucket: string;

    private constructor() {
        this.storage = config;
        this.bucket = bucketName;
    }


    async uploadImage (image: string): Promise<boolean> {
        try{
            await this.storage.bucket(this.bucket).upload(image, {
                gzip: true,
                metadata: {
                    cacheControl: 'public, max-age=31536000',
                },
            });

            return true;
        } catch(error) {
            console.log(error);
            return false;
        }
    }
}
