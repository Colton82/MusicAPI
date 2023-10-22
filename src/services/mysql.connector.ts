import { configDotenv } from "dotenv";
import { createPool, Pool } from "mysql";
import dotenv from "dotenv";

let pool: Pool | null = null;
dotenv.config({ path: "../.env"})

const initializeMySqlConnector = () => {
    try {
        pool = createPool({
            connectionLimit:
            10,
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host : process.env.MY_SQL_DB_HOST,
            user : process.env.MY_SQL_DB_USER,
            password : process.env.MY_SQL_DB_PASSWORD,
            database : process.env.MY_SQL_DB_DATABASE,
        });

        console.debug('MySql Adapter Pool generated successfully');
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if(err) {
                console.log('error mysql failed to connect');
                throw new Error('not able to connect to database');
            }
            else {
                console.log('connection made');
                connection.release();
            }
        })
    } catch(error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]', error);
        throw new Error('failed to initialized pool');
    }
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if(!pool) {
            initializeMySqlConnector();
        }
        return new Promise<T>((resolve, reject) =>{
            pool!.query(query, params, (error, results) => {
                if(error) reject(error);
                else resolve(results);
            });
        });
    } catch (error) {
        console.error('mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}