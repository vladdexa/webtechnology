import {configs} from "../configs";
import {Readable} from "stream";

const nodemailer = require('nodemailer');

interface AuthCredentials {
    user: string;
    pass: string;
}

export interface MailPayload {
    to: string;
    subject: string;
    text: string;
    html?: string| Readable;
}

export class MailService {

    static template(userDetails: any, userCart: string){

        const text = `
        <div>
        <h2>Your order:</h2>
        <div>${userCart}</div>
        <h2>Your order Details</h2>
        <div>
        <ul>
        <li>${userDetails.firstName}</li>
        <li>${userDetails.lastName}</li>
        <li>${userDetails.email}</li>
        <li>${userDetails.phoneNo}</li>
        <li>${userDetails.country}</li>
        <li>${userDetails.state}</li>
        <li>${userDetails.address}</li>
        <li>${userDetails.payment}</li>
        </ul>
        </div>
        <h1>Thank you for your order</h1>
        </div>
        `;
        const streamText = new Readable();
        streamText.push(text);
        streamText.push(null);

        return streamText;

    }

    private readonly service: string;
    private readonly auth: AuthCredentials;
    private transporter: any;

    constructor() {
        const {emailServiceProvider, user, pass} = configs;

        this.service = emailServiceProvider;
        this.auth = {
            user,
            pass
        };

        this.transporter = nodemailer.createTransport({
            service: this.service,
            auth: this.auth,
        });

    }

    async sendEmail(payload: MailPayload): Promise<any> {
        try {
            return await this.transporter.sendMail(payload);
        } catch (error) {
            console.log(error);
        }
    }
}
