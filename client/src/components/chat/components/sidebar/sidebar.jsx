import React, { useState } from "react";
import styles from './styles.module.css'

const Sidebar = () => {

    return (
        <div className={styles.sidebar}>
            <h4 className='header'>Users</h4>
            <ul className='users'>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        </div>
    );
};

export default Sidebar;