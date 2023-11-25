import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({socket}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('user', user)
        navigate('/chat')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Войти в чат</h2>
            <label htmlFor='user'></label>
            <input type="text" id='user' value={user} onChange={(e) => setUser(e.target.value)}/>
            <button type='submit'>Войти</button>
        </form>
    );
};

export default Home;