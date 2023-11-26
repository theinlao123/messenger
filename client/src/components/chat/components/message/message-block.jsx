import React, { useState } from "react";
import styles from './styles.module.css'

const MessageBlock = ({socket}) => {

    const [message, setMessage] = useState('');
    const isTyping = () => {
        const users = [];
        const userCount = parseInt(localStorage.getItem('userCount')) || 0;

        for (let i = 1; i <= userCount; i++) {
            const userKey = `user${i}`;
            const userData = localStorage.getItem(userKey);
            if (userData) {
                users.push(JSON.parse(userData));
            }
        }
        const currentUser = users.find(user => user.socketID === socket.id);

        socket.emit('typing', `${currentUser.user} печатает ...`)
    }

    const handleSend = (e) => {
        e.preventDefault();

        const users = [];
        const userCount = parseInt(localStorage.getItem('userCount')) || 0;

        for (let i = 1; i <= userCount; i++) {
            const userKey = `user${i}`;
            const userData = localStorage.getItem(userKey);
            if (userData) {
                users.push(JSON.parse(userData));
            }
        }

        if (message.trim()) {
            const currentUser = users.find(user => user.socketID === socket.id);
            socket.emit('message', {
                text: message,
                name: currentUser ? currentUser.user : 'Unknown User',
                id: `${socket.id}-${Math.random()}`,
                socketID: socket.id
            });
        }
        setMessage('')
    }
    

    return (
        <div className={styles.messageBlock}>
            <form onSubmit={handleSend}>
                <input 
                    type="text" 
                    className={styles.userMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={isTyping} 
                />
                <button className={styles.submitButton}>Отправить</button>
            </form>
        </div>
    );
};

export default MessageBlock;