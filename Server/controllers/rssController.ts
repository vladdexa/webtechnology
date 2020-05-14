import {ProductRepository} from "../repositories/ProductRepository";
import {Product} from "../models/entities/Product";
import HttpStatus from 'http-status-codes'

const DOMParser = require('xmldom').DOMParser;

async function generateRssFeed(req: any, res: any) {
    const document = new DOMParser().parseFromString(
        `<?xml version="1.0" encoding="UTF-8" ?>
                <rss version="2.0">
                   <channel>
                      <title>Online Toys</title>
                      <link>http://localhost:3000/home</link>
                      <description>Cele mai populare produse</description>
                      <language>ro-ro</language>
                  </channel>
                </rss>`, 'text/xml'
    );

    if (document) {


        const productRepository: ProductRepository = new ProductRepository();
        const numberOfProducts: number = 10;
        const productsFromDb: Product[] = await productRepository.getFirstNRecordsOrderByAccessCounter(numberOfProducts);

        const products = productsFromDb.map((product, index) => (
            {
                name: product.name,
                accessCounter: `Numar de accesari: ${product.accessCounter}`,
                id: product.id,
                price: product.price,
            }
        ));

        const channel = document.documentElement.getElementsByTagName('channel')[0];

        products.forEach((product) => {
            const item = document.createElement('item');
            const title = document.createElement('title');
            title.textContent = product.name;
            const link = document.createElement('link');
            link.textContent = `http://localhost/product?productId=${product.id}`;
            const description = document.createElement('description');
            description.textContent = product.accessCounter;

            item.appendChild(title);
            item.appendChild(link);
            item.appendChild(description);

            channel.appendChild(item);

        });

        res.writeHead(HttpStatus.OK, {'Content-Type': 'text/xml'});
        res.end(document.toString());

    } else {
        res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type': 'text/html'});
        const response = {
            message: 'Unexpected error'
        };

        res.end(JSON.stringify(response));
    }
}

export {generateRssFeed};
