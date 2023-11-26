import React, { useEffect, useState } from "react";
import styles from './styles.module.css'

const Sidebar = ({socket}) => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        socket.on('responseNewUser', (data) => setUsers(data))
    },[socket, users])

    return (
        <div className={styles.sidebar}>
            <h4 className={styles.header}>В чате</h4>
            <ul className={styles.users}>
                {
                    users.map(element => (
                        <li key={element.socketID}>{element.user}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;