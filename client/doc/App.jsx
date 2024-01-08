import { Routes, Route } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

// Устанавливаем соединение с сервером WebSocket
const socket = socketIO.connect('http://localhost:5000')

/**
 * Основной компонент приложения, определяющий маршруты и передающий объект WebSocket в компоненты.
 *
 * @component
 * @returns {JSX.Element} - Возвращает JSX элемент приложения.
 */
function App() {
  return (
    <Routes>
      {/* Маршрут для домашней страницы */}
      <Route path='/' element={<Home socket={socket} />} />
      {/* Маршрут для страницы чата */}
      <Route path='/chat' element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
