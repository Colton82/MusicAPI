import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Product } from "./products.model";
import { productQueries} from './products.queries';

export const readProducts = async () => {
    return execute<Product[]>(productQueries.readProducts, []);
}
export const createProduct = async(product: Product) => {
    return execute<OkPacket>(productQueries.createProduct,[product.name, product.quantity, product.price, product.category]);
}
export const updateProduct = async(product: Product) => {
    return execute<OkPacket>(productQueries.updateProduct,[product.name, product.quantity,product.price,product.category, product.id]);
}
export const deleteProduct = async(productId: number) => {
    return execute<OkPacket>(productQueries.deleteProduct,[productId]);
}