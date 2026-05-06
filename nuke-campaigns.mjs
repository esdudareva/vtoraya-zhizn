import mysql from 'mysql2/promise';

try {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  // First, check how many campaigns exist
  const [campaigns] = await connection.execute('SELECT COUNT(*) as count FROM campaigns');
  console.log(`Found ${campaigns[0].count} campaigns`);
  
  // Delete all campaigns
  const [result] = await connection.execute('DELETE FROM campaigns');
  console.log(`✓ Deleted ${result.affectedRows} campaigns`);
  
  // Verify deletion
  const [verify] = await connection.execute('SELECT COUNT(*) as count FROM campaigns');
  console.log(`Remaining campaigns: ${verify[0].count}`);
  
  await connection.end();
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
