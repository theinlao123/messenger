import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'

/**
 * Компонент домашней страницы, предназначенной для ввода имени пользователя перед входом в чат.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {object} props.socket - Объект WebSocket для взаимодействия с сервером.
 * @returns {JSX.Element} - Возвращает JSX элемент домашней страницы.
 */
const Home = ({ socket }) => {
    const navigate = useNavigate();
    // Состояние для хранения введенного пользователем имени
    const [user, setUser] = useState('');

    /**
     * Обработчик отправки формы.
     * Сохраняет имя пользователя в локальном хранилище, отправляет уведомление на сервер и перенаправляет на страницу чата.
     *
     * @param {Event} e - Событие отправки формы.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const userCount = parseInt(localStorage.getItem('userCount')) || 0;
        const newUserKey = `user${userCount + 1}`;

        // Сохраняем информацию о новом пользователе в локальном хранилище
        localStorage.setItem(newUserKey, JSON.stringify({ user, socketID: socket.id }));
        localStorage.setItem('userCount', userCount + 1);

        // Отправляем уведомление на сервер о новом пользователе
        socket.emit('newUser', { user, socketID: socket.id });

        // Перенаправляем на страницу чата
        navigate('/chat');
    }

    return (
        <div className={styles.container}>
            {/* Форма ввода имени пользователя */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Войти в чат</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor='user'></label>
                    {/* Поле ввода имени пользователя */}
                    <input className={styles.input} type="text" id='user' value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
                {/* Кнопка входа в чат */}
                <button className={styles.button} type='submit'>Войти</button>
            </form>
        </div>
    );
};

export default Home;
