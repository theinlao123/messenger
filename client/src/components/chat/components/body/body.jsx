import React, { useState } from "react";
import styles from './styles.module.css'

const Body = () => {

    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                <div className={styles.chats}>
                    <p className={styles.senderName}>Вы</p>
                    <div className={styles.messageSender}>
                        <p>Hello</p>
                    </div>
                </div>

                <div className={styles.chats}>
                    <p>Вы</p>
                    <div className={styles.messageRecipient}>
                        <p>Hello</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;