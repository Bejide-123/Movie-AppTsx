import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import MovieDetailPage from './Pages/MovieDetails'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
