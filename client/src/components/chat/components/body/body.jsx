import React, { useState } from "react";
import styles from './styles.module.css'

const Body = () => {

    return (
        <>
            <header className='header'>
                <button className='btn'>Покинуть чат</button>
            </header>

            <div className="container">
                <div className="chats">
                    <p>Вы</p>
                    <div className="message-sender">
                        <p>Hello</p>
                    </div>
                </div>

                <div className="chats">
                    <p>Вы</p>
                    <div className="message-recipient">
                        <p>Hello</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;