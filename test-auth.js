// Simple test script to verify our authentication setup
const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testAuth() {
  console.log('Testing ACO Authentication System...\n');

  // Test data
  const testUsers = [
    { email: 'rina@example.com', password: 'password123', role: 'investor_micro' },
    { email: 'budi@example.com', password: 'password123', role: 'investor_enterprise' },
    { email: 'dimas@example.com', password: 'password123', role: 'project_owner' }
  ];

  for (const user of testUsers) {
    try {
      console.log(`Testing login for: ${user.email} (${user.role})`);
      
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: user.email,
        password: user.password
      });

      console.log('✅ Login successful!');
      console.log('   Token:', response.data.access_token.substring(0, 20) + '...');
      console.log('   User:', response.data.user);
      console.log('---');

      // Test profile access with token
      try {
        const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`
          }
        });
        console.log('✅ Profile access successful!');
      } catch (profileError) {
        console.log('❌ Profile access failed:', profileError.response?.data?.message);
      }

    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
    }
    console.log('\n');
  }
}

// Run the test
testAuth().catch(console.error);