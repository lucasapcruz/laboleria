import pkg from 'pg';
import dotenv from "dotenv"
import { parseFloatAndSetPrecision } from '../helpers/numbers.js';

const { Pool, types } = pkg;

dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//types.setTypeParser(1700, parseFloat)

export { connection};
