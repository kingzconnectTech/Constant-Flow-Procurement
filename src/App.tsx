import { Routes } from './router'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import CategoriesPage from './pages/CategoriesPage'
import './App.css'

function App() {
  return (
    <Routes
      routes={[
        { path: '/', element: <HomePage /> },
        { path: '/categories', element: <CategoriesPage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '*', element: <HomePage /> },
      ]}
    />
  )
}

export default App
