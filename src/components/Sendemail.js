import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Logout from './Logout';
import Record from './Record';
import { setCookie } from './Helper';
import { useParams } from 'react-router-dom'; 
import Emailsend from './Emailsend';
import Table from './Table';

export default function Sendemail() {
  
  const { token } = useParams(); 

  useEffect(() => {
    // Store the token in a cookie
    if (token) {
      setCookie('token', token);
    }
  }, [token]);


  

  return (
    <div className="container mx-auto mt-10 p-4">
      <ToastContainer />
      <Logout />
     <div><Emailsend></Emailsend></div>
      <Record></Record>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}
