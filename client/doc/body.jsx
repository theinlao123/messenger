import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'

/**
 * Компонент тела чата.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.messages - Массив сообщений чата.
 * @param {string} props.status - Статус чата.
 * @param {object} props.socket - Объект WebSocket для взаимодействия с сервером.
 * @returns {JSX.Element} - Возвращает JSX элемент тела чата.
 */
const Body = ({ messages, status, socket }) => {
    const navigate = useNavigate();

    /**
     * Обработчик покидания чата.
     * Удаляет текущего пользователя из локального хранилища и отправляет уведомление на сервер.
     */
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

    // Сбор информации о пользователях из локального хранилища.
    const users = [];
    const userCount = parseInt(localStorage.getItem('userCount')) || 0;

    for (let i = 1; i <= userCount; i++) {
        const userKey = `user${i}`;
        const userData = localStorage.getItem(userKey);
        if (userData) {
            users.push(JSON.parse(userData));
        }
    }

    // Поиск текущего пользователя по socket.id.
    const currentUser = users.find(user => user.socketID === socket.id);

    return (
        <>
            {/* Заголовок чата с кнопкой "Покинуть чат" */}
            <header className={styles.header}>
                <button className={styles.btn} onClick={handleLeave}>Покинуть чат</button>
            </header>

            {/* Отображение сообщений, статуса и информации о текущем пользователе */}
            <div className={styles.container}>
                {messages.map(element =>
                    element.socketID === currentUser.socketID ? (
                        // Отображение сообщения текущего пользователя
                        <div className={styles.chats} key={element.id}>
                            <p className={styles.senderName}>Вы</p>
                            <div className={styles.messageSender}>
                                <p>{element.text}</p>
                            </div>
                        </div>
                    ) : (
                        // Отображение сообщения другого пользователя
                        <div className={styles.chats} key={element.id}>
                            <p>{element.name}</p>
                            <div className={styles.messageRecipient}>
                                <p>{element.text}</p>
                            </div>
                        </div>
                    ))}
                
                {/* Отображение статуса чата */}
                <div className={styles.status}>
                    <p>{status}</p>
                </div>
            </div>
        </>
    );
};

export default Body;
