import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const dbPool = new Pool({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.POSTGRESQL_PASSWORD,
    port: Number(process.env.POSTGRESQL_PORT),
    ssl: {
        rejectUnauthorized: false,
    },
});

export = dbPool;
