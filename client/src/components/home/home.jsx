import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'

const Home = ({socket}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const handleSubmit = (e) => {
    
        e.preventDefault();

        const userCount = parseInt(localStorage.getItem('userCount')) || 0;

        const newUserKey = `user${userCount + 1}`;

        localStorage.setItem(newUserKey, JSON.stringify({ user, socketID: socket.id }));

        localStorage.setItem('userCount', userCount + 1);

        socket.emit('newUser', { user, socketID: socket.id });

        navigate('/chat');
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Войти в чат</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor='user'></label>
                    <input className={styles.input} type="text" id='user' value={user} onChange={(e) => setUser(e.target.value)}/>
                </div>
                <button className={styles.button} type='submit'>Войти</button>
            </form>
        </div>
    );
};

export default Home;