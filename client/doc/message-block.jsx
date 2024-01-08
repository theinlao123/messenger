import React, { useState } from "react";
import styles from './styles.module.css'

/**
 * Компонент блока сообщений и ввода текста для отправки сообщений.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {object} props.socket - Объект WebSocket для взаимодействия с сервером.
 * @returns {JSX.Element} - Возвращает JSX элемент блока сообщений и ввода текста.
 */
const MessageBlock = ({ socket }) => {
    // Состояние для хранения введенного пользователем сообщения
    const [message, setMessage] = useState('');

    /**
     * Обработчик отправки сообщения.
     * Отправляет сообщение на сервер через WebSocket и очищает поле ввода.
     *
     * @param {Event} e - Событие отправки формы.
     */
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
        setMessage('');
    }

    /**
     * Обработчик события "нажатие клавиши".
     * Отправляет уведомление на сервер о том, что пользователь печатает.
     */
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

    return (
        <div className={styles.messageBlock}>
            {/* Форма для ввода сообщения */}
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
