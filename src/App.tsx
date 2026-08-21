import { Routes } from './router'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <Routes
      routes={[
        { path: '/', element: <HomePage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '*', element: <HomePage /> },
      ]}
    />
  )
}

export default App
