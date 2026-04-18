import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432, // default PostgreSQL port
});

export default pool;