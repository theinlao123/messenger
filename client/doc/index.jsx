import React, { useEffect, useState } from "react";
import Body from "./components/body/body";
import MessageBlock from "./components/message/message-block";
import Sidebar from "./components/sidebar/sidebar";
import styles from './styles.module.css'

/**
 * Компонент страницы чата, объединяющий боковую панель, тело чата и блок ввода сообщений.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {object} props.socket - Объект WebSocket для взаимодействия с сервером.
 * @returns {JSX.Element} - Возвращает JSX элемент страницы чата.
 */
const ChatPage = ({ socket }) => {
    // Состояние для хранения списка сообщений в чате
    const [messages, setMessages] = useState([]);
    // Состояние для отображения статуса "печатает" в чате
    const [status, setStatus] = useState('');

    /**
     * Эффект, который подписывается на событие 'response' от сервера.
     * Обновляет список сообщений при получении нового сообщения.
     */
    useEffect(() => {
        socket.on('response', (data) => setMessages([...messages, data]));

        // Отписываемся от события при размонтировании компонента
        return () => {
            socket.off('response');
        };
    }, [socket, messages]); // Перезапускаем эффект при изменении объекта WebSocket и списка сообщений

    /**
     * Эффект, который подписывается на событие 'responseTyping' от сервера.
     * Обновляет статус "печатает" в чате и сбрасывает его через 5 секунд.
     */
    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data);
            // Сбрасываем статус "печатает" через 5 секунд
            setTimeout(() => setStatus(''), 5000);
        });

        // Отписываемся от события при размонтировании компонента
        return () => {
            socket.off('responseTyping');
        };
    }, [socket]);

    return (
        <div className={styles.chat}>
            {/* Боковая панель чата */}
            <Sidebar socket={socket} />
            <main className={styles.main}>
                {/* Тело чата */}
                <Body messages={messages} status={status} socket={socket} />
                {/* Блок ввода сообщений */}
                <MessageBlock socket={socket} />
            </main>
        </div>
    );
}

export default ChatPage;
