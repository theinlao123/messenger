import React, { useEffect, useState } from "react";
import styles from './styles.module.css'

/**
 * Компонент боковой панели чата, отображающей список пользователей в чате.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {object} props.socket - Объект WebSocket для взаимодействия с сервером.
 * @returns {JSX.Element} - Возвращает JSX элемент боковой панели чата.
 */
const Sidebar = ({ socket }) => {
    // Состояние для хранения списка пользователей в чате
    const [users, setUsers] = useState([]);

    /**
     * Эффект, который подписывается на событие 'responseNewUser' от сервера.
     * Обновляет список пользователей при появлении новых участников чата.
     */
    useEffect(() => {
        socket.on('responseNewUser', (data) => setUsers(data));

        // Отписываемся от события при размонтировании компонента
        return () => {
            socket.off('responseNewUser');
        };
    }, [socket, users]); // Перезапускаем эффект при изменении объекта WebSocket и списка пользователей

    return (
        <div className={styles.sidebar}>
            {/* Заголовок боковой панели */}
            <h4 className={styles.header}>В чате</h4>
            {/* Список пользователей */}
            <ul className={styles.users}>
                {users.map(element => (
                    <li key={element.socketID}>{element.user}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
