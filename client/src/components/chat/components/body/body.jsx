import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'

const Body = ({messages, status, socket}) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        for (let i = 1; i <= userCount; i++) {
            const userKey = `user${i}`;
            const userData = localStorage.getItem(userKey);
    
            if (userData) {
                const user = JSON.parse(userData);
    
                if (user.socketID === currentUser.socketID) {
                    localStorage.removeItem(userKey);
                    socket.emit('newUser', { user: user.user, socketID: user.socketID });
                    break; 
                }
            }
        }
    
        navigate('/')
    }

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


    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn} onClick={handleLeave}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                {
                    messages.map(element => 
                        element.socketID === currentUser.socketID ? (
                            <div className={styles.chats} key={element.id}>
                                <p className={styles.senderName}>Вы</p>
                                <div className={styles.messageSender}>
                                    <p>{element.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.chats} key={element.id}>
                                <p>{element.name}</p>
                                <div className={styles.messageRecipient}>
                                    <p>{element.text}</p>
                                </div>
                            </div>
                        ))
                }
                
                <div className={styles.status}>
                    <p>{status}</p>
                </div>
            </div>
        </>
    );
};

export default Body;