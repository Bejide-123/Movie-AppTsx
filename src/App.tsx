
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import MovieDetailPage from './Pages/MovieDetails'
import FavoritesPage from './Pages/Favourites'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  )
}

export default App
