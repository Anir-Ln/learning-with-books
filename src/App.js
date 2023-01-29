import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookReader from './BookReader'
import Dashboard from './Dashboard'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/read/:lang/:bookName' element={<BookReader />} />
    </Routes>
  )
}

export default App