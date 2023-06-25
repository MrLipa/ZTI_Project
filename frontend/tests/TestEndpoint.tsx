import React from 'react';
import axios from 'axios';

const TestEndpoint = () => {
  const test = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/1');

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={test} style={{ display: 'block', margin: '0 auto' }}>
        Test Endpoint
      </button>
    </div>
  );
}

export default TestEndpoint;
