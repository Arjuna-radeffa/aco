const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '2wsx1qaz',
    database: 'postgres',
  });

  try {
    await client.connect();
    // Check if database exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'aco_platform'");
    if (res.rowCount === 0) {
      console.log("Creating database 'aco_platform'...");
      await client.query('CREATE DATABASE aco_platform');
      console.log('Database created successfully!');
    } else {
      console.log("Database 'aco_platform' already exists.");
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
