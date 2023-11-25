import Body from "./components/body/body";
import MessageBlock from "./components/message/message-block";
import Sidebar from "./components/sidebar/sidebar";
import styles from './styles.module.css'

const ChatPage = ({socket}) => {
    return (
        <div className={styles.chat}>
            <Sidebar />
            <main className={styles.main}>
                <Body />
                <MessageBlock />
            </main>
        </div>
    )
}

export default ChatPage;