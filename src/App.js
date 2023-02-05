import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookReader from './pages/BookReader'
import Dashboard from './pages/Dashboard'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/read/:lang/:bookName' element={<BookReader />} />
    </Routes>
  )
}

export default App