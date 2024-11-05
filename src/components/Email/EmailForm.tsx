import React, { useState } from 'react';

const EmailForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Replace this with actual API call to send email
            console.log(`Sending email to: ${email} with message: ${message}`);
            setStatus('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('Failed to send email.');
        }
    };

    return (
        <div>
            <h1>Email Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default EmailForm;
