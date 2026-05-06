import { drizzle } from 'drizzle-orm/mysql2/driver';
import mysql from 'mysql2/promise';
import { users } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

try {
  await db.update(users)
    .set({ role: 'admin' })
    .where(eq(users.email, 'e.s.dudareva@students.psu.by'));
  
  console.log('✓ User role updated to admin');
  process.exit(0);
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
} finally {
  await connection.end();
}
