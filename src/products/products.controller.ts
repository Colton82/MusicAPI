import { Request, RequestHandler, Response } from "express";
import { Product } from './products.model';
import * as ProductsDao from './products.dao';
import { OkPacket } from "mysql";

export const readProducts: RequestHandler = async (req: Request, res: Response) => {
    try {
        let products;
        let productId = parseInt(req.query.albumId as string);

        console.log('productId', productId);

        products = await ProductsDao.readProducts();

        res.status(200).json(
            products
        );
    } catch (error) {
        console.error('[products.controller][readProducts][Error]', error);
        res.status(500).json({
            message: 'there was an error when fetching products'
        });
    }
};
export const createProduct: RequestHandler = async (req: Request, res: Response) => {
    try{
        const okPacket = await ProductsDao.createProduct(req.body);
        console.log('req.body', req.body);
        console.log('product', okPacket);
    } catch(error) {
        console.error('[products.controller][createProduct][error]', error);
        res.status(500).json({
            message: 'there was an error writing products'
        });
    }
};
export const updateProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ProductsDao.updateProduct(req.body);
        console.log('req.body', req.body);
        console.log('album', okPacket);
        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[albums.controller][updateAlbum][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating albums'
        });
    }
};
export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        let productId = req.body.id;

        console.log('productId', productId);
        const response = await ProductsDao.deleteProduct(productId);

    } catch (error) {
        console.error('[albums.controller][deleteAlbum][Error]', error);
        res.status(500).json({
            message: 'there was an error when deleting albums'
        });
    }
};
