import HttpStatus from 'http-status-codes'
import {Userproduct} from '../models/entities/Userproduct';
import {UserProductRepository} from '../repositories/UserProductRepository';
import {Product} from '../models/entities/Product';
import {ProductRepository} from '../repositories/ProductRepository';
import {MailPayload, MailService} from "../services/MailService";

interface UserDetailsPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    country: string;
    state: string;
    address: string;
    payment: string;
}

async function getProductsForShoppingCart(req: any, res: any) {
    const userIdString: string = req.body.userId;
    const userId: number = parseInt(userIdString, 10);

    const userProductRepository = new UserProductRepository();
    const products: Userproduct[] = await userProductRepository.getByUserId(userId);

    let productsForShoppingCarts: Product[] = [];
    let index: number = 0;

    const productRepository = new ProductRepository();

    while (index < products.length) {
        const product: Product = (await productRepository.getById(products[index].productId))[0];
        productsForShoppingCarts.push(product);
        index++;
    }

    const response = {
        products: productsForShoppingCarts
    }


    res.writeHead(HttpStatus.OK, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
}

async function deleteProductFromShoppingCart(req: any, res: any) {
    const productId: number = req.body.productId;

    const userProductRepository = new UserProductRepository();
    const userProduct: Userproduct = (await userProductRepository.getByProductId(productId))[0];

    await userProductRepository.delete(userProduct.id);

    const response = {
        message: 'The product has been deleted from shopping cart with successs.'
    }

    res.writeHead(HttpStatus.OK, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));

}

async function placeYourOrder(req: any, res: any) {
    const userDetails: UserDetailsPayload = req.body.userDetails;
    const userCart = req.body.userCart;

    if(
        !userDetails.firstName
        || !userDetails.lastName
        || !userDetails.email
        || !userDetails.phoneNo
        || !userDetails.country
        || !userDetails.state
        || !userDetails.payment
    ) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type': 'application/json'});
        const response = {
            message: 'Invalid request, some of your order details are missing',
            success: false,
        };
        res.end(JSON.stringify(response));
    }


    if (userCart === []) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type': 'application/json'});
        const response = {
            message: 'Invalid request, your bag is empty',
            success: false,
        };
        res.end(JSON.stringify(response));
    }

    const userProductRepository = new UserProductRepository();
    const userProducts: Userproduct[] = (await userProductRepository.getAll());

    if (userProducts.length === 0) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type': 'application/json'});
        const response = {
            message: `Invalid request, your bag is empty`,
            success: false,
        };
        res.end(JSON.stringify(response));
    }

    for (const product of userProducts) {
        await userProductRepository.delete(product.id);
    }


    const html = MailService.template(userDetails, userCart);
    const mailService = new MailService();
    const payload: MailPayload = {
        to: userDetails.email,
        subject: 'Online toys order',
        text: 'Your order:',
        html,
    };
    try {
        const mailServiceResponse = await mailService.sendEmail(payload);

        if (mailServiceResponse.accepted.length > 0) {
            res.writeHead(HttpStatus.OK, {'Content-Type': 'application/json'});
            const response = {
                message: "Your order confirmation has been sent to your email",
                success: true,
            };
            res.end(JSON.stringify(response));
        } else {
            res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type': 'application/json'});
            const response = {
                message: "Your order has been received, but failed send confirmation to your email",
                success: false,
            };
            res.end(JSON.stringify(response));
        }
    } catch (error) {
        console.log(error);
        res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type': 'application/json'});
        const response = {
            message: "Your order has been received, but failed send confirmation to your email",
            success: false,
        };
        res.end(JSON.stringify(response));
    }

}

export {getProductsForShoppingCart, deleteProductFromShoppingCart, placeYourOrder}
