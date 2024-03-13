import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DATABASE,
  allowExitOnIdle: true,
  //connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err,res) =>{
  res ? console.log('DB-Connected', res.rows[0].now) : console.log({err});
});

export default pool;
