import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [result] = await connection.execute('DELETE FROM campaigns');
console.log(`Deleted ${result.affectedRows} campaigns`);
await connection.end();
