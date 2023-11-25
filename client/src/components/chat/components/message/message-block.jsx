import React, { useState } from "react";
import styles from './styles.module.css'

const MessageBlock = () => {

    return (
        <div className={styles.messageBlock}>
            <form action="">
                <input type="text" className={styles.userMessage} />
                <button className={styles.submitButton}>Сказать</button>
            </form>
        </div>
    );
};

export default MessageBlock;