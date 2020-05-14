import {JSDOM} from 'jsdom';
import {ProductRepository} from "../repositories/ProductRepository";
import {Product} from "../models/entities/Product";
import HttpStatus from 'http-status-codes'


async function generateRssFeed(req: any, res: any) {
    const document = new JSDOM(
        `<?xml version="1.0" encoding="UTF-8" ?>
                <rss version="2.0">
                <channel>
                    <title>Online Toys</title>
                    <link>http://localhost:3000/home</link>
                    <description>Cele mai populare produse</description>
                    <language>ro-ro</language>
                    </channel>
                    </rss>`
    );

    const productRepository: ProductRepository = new ProductRepository();
    const numberOfProducts: number = 10;
    const productsFromDb: Product[] = await productRepository.getFirstNRecordsOrderByAccessCounter(numberOfProducts);

    const products = productsFromDb.map((product, index)=>(

        {
            name: product.name,
            accessCounter: `Numar de accesari: ${product.accessCounter}`,
            id: product.id,
            price: product.price,
        }
    ));

    const channel = document.window.querySelector('channel');

    products.forEach((product) => {
        const item = document.window.createElement('item');
        const title = document.window.createElement('title');
        title.innerHTML = product.name;
        const link = document.window.createElement('link');
        link.innerHTML = `http://localhost/product?productId=${product.id}`;
        const description = document.window.createElement('description');
        description.innerHTML = product.accessCounter;

        item.appendChild(title);
        item.appendChild(link);
        item.appendChild(description);

        channel.appendChild(item);
    });

    res.writeHead(HttpStatus.OK, {'Content-Type': 'application/xml'});
    res.end(document);


}
 export {generateRssFeed};
