import React, { useState } from "react";
import styles from './styles.module.css'

const Body = () => {

    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                <div className={styles.chat}>
                    <p>Вы</p>
                    <div className={`${styles.message} ${styles.messageSender}`}>
                        <p>Hello</p>
                    </div>
                </div>

                <div className={styles.chat}>
                    <p>Вы</p>
                    <div className={`${styles.message} ${styles.messageRecipient}`}>
                        <p>Hello</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;