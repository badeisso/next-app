import './envConfig.ts';
import { loadEnvConfig } from '@next/env';
const mysql = require("mysql2");
const projectDir = process.cwd();
loadEnvConfig(projectDir)

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    connectionLimit: 10,
});

export const runQurey = async (sql, binds) => {
    return new Promise((reslove, reject) => {
        connection.getConnection((error, conn) => {
            if (error)
                reject("Unable to establish DB connection - error" + error.message);
            conn.query({
                sql: sql,
                values: binds,
                timeout: 60000
            }, (err, result) => {
                if (err)
                    reject(`Error while executing SQL statement: ${sql} - ${err.message}`);
                conn.release();
                reslove(result);
            });

        })
    })
}