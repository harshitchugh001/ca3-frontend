import React, { useState } from 'react';
import { getCookie } from './Helper';

export default function EmailSend() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = getCookie('token');
            console.log(token)
            const accessToken = token;

            // Create an emailData object with subject, body, and recipientEmail
            const emailData = {
                subject,
                body,
                recipientEmail: email,
            };

            // Send a POST request to your Flask backend's /send-email route
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    accessToken,
                    emailData,
                }),
            });

            if (response.status === 200) {
                // Email sent successfully
                alert('Email sent successfully');
            } else {
                // Handle other status codes if needed
                alert('Failed to send email');
            }
        } catch (error) {
            console.error('SEND EMAIL ERROR', error);
            alert('Failed to send email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Send Email</h1>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Recipient Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <textarea
                        placeholder="Email Body"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows="4"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Email'}
                </button>
            </div>
        </div>
    );
}
