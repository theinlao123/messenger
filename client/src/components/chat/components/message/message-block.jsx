import React, { useState } from "react";
import styles from './styles.module.css'

const MessageBlock = () => {

    return (
        <div className='message-block'>
            <form action="">
                <input type="text" className='user-message'/>
                <button>Сказать</button>
            </form>
        </div>
    );
};

export default MessageBlock;