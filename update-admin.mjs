import { drizzle } from 'drizzle-orm/mysql2/driver';
import mysql from 'mysql2/promise';
import { users } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

try {
  const result = await db.update(users)
    .set({ role: 'admin' })
    .where(eq(users.email, 'e.s.dudareva@students.psu.by'));
  
  console.log('User role updated to admin');
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await connection.end();
}
