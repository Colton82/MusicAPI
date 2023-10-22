import express, {Request, Response} from "express";
import productsRouter from './products/products.routes'
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(helmet());

if(process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + 'in dev mode')
}
app.use('/', [productsRouter]);
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the musicStore API</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening att http://localhost:${port}`);
});


