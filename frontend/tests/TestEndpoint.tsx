import React from 'react';
import axios from 'axios';

const TestEndpoint = () => {
  const testRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email: 'ugsers@example.com',
        password: 'user'
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={testRegister} style={{ display: 'block', margin: '0 auto' }}>
        Test Register Endpoint
      </button>
    </div>
  );
}

export default TestEndpoint;
