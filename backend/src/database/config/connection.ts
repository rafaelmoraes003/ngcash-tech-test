import { Options } from 'sequelize';
import 'dotenv/config';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: 'NG_CASH',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = config;
