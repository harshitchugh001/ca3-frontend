import React, { useState, useEffect } from 'react';
import { getCookie } from './Helper'

export default function Table() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const token = getCookie('token');
      
        // Get the token from the cookie
        if (token) {
          // Send a GET request to the backend with the token in the request header
          fetch('http://localhost:5000/get-email-details', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the request header
            }
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Failed to retrieve emails');
              }
            })
            .then((data) => {
              console.log(data);
              // Update the state with the received data
              setTableData(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          console.log('Token not found in cookie.');
        }
      }, []);
    

  return (
    <div className="flex justify-center">
    <table className="table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2">Sender Email</th>
          <th className="px-4 py-2">Receiver Email</th>
          <th className="px-4 py-2">Link</th>
          <th className="px-4 py-2">Mail Sent Time</th>
          <th className="px-4 py-2">Link Present</th>
          <th className="px-4 py-2">Mail Read</th>
          <th className="px-4 py-2">Link Open Time</th>
          <th className="px-4 py-2">Link Open Count</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{data.senderEmail}</td>
            <td className="px-4 py-2">{data.receiverEmail}</td>
            <td className="px-4 py-2">{data.link}</td>
            <td className="px-4 py-2">{data.mailSentTime}</td>
            <td className="px-4 py-2">{data.linkPresent ? 'Yes' : 'No'}</td>
            <td className="px-4 py-2">{data.mailRead ? 'Yes' : 'No'}</td>
            <td className="px-4 py-2">{data.linkOpenTime}</td>
            <td className="px-4 py-2">{data.linkOpenCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}