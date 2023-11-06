import React, { useEffect, useState } from 'react';
import { getCookie } from './Helper';

export default function Record() {
  const [emails, setEmails] = useState([]);
  
  useEffect(() => {
    const token = getCookie('token');
    console.log(token)
    
    if (token) {
      // Send a POST request to the backend
      fetch('http://localhost:5000/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: token }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to retrieve emails');
          }
        })
        .then((data) => {
          console.log(data)
          // Update the state with the received data
          setEmails(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('Token not found in cookie.');
    }
  }, []);

  return (
    <div>
      <h2>Emails:</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
}
