import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, orderGamesByRating, orderGamesByName, filterGameCreated, filterGameByGenre } from '../actions';
import '../styles/Home.css';
import { Card } from './Card'
import { SearchBar } from './SearchBar';
import { Paginado } from './Paginado';
import { Footer } from './Footer';


export const Home = () => {

// Dispatch es la función que ejecuta las funciones de ./actions
  const dispatch = useDispatch();
  // Me traigo el estado de games de la store
  const allGames = useSelector((state) => state.games);
  const genres = useSelector((state) => state.genres);


  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexFirstGame, indexLastGame);
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// Ejecuto la action getGames de ./Actions
  useEffect(() => {
    dispatch(getGames());
  },[dispatch])

// Ejecuto la action getGenres de ./Actions
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch]);
  
  const handleLoadGames = (e) => {
    e.preventDefault();
    dispatch(getGames());
  };

  const handleOrderGameByName = (e) => {
    setOrden(`Ordenado ${e.target.value}`);
    dispatch(orderGamesByName(e.target.value));
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleOrderGameByRating = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderGamesByRating(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterGameCreated = (e) => {
    e.preventDefault();
    dispatch(filterGameCreated(e.target.value))
  };

  const handleFilterGameByGenre = (e) => {
    e.preventDefault();
    dispatch(filterGameByGenre(e.target.value))
  };


  return (
    <div>

      <SearchBar/>

      <div>
        <span className='order-by'>Order by:</span>
        <button 
          className='btn-neon-home' 
          onClick={e => {handleLoadGames(e)}}>
          Load Games
        </button>
        
        <span className='filter-by'>Filter by:</span>
      </div>

      <div className='filter-container'>
        <select className='order-option' onClick={(e) => (handleOrderGameByName(e))}>
          <option value='nam-asc'>Name (A-Z)</option>
          <option value='nam-des'>Name (Z-A)</option>
        </select>

        <select className='order-option' onClick={(e) => (handleOrderGameByRating(e))}>
          <option value='rat-asc'>Rating (1-5)</option>
          <option value='rat-des'>Rating (5-1)</option>
        </select>

        <select className='filter-option' onChange={(e) => (handleFilterGameCreated(e))}>
          <option value='all-games'>All Games</option>
          <option value='vid-exi'>Api Games</option>
          <option value='vid-cre'>DB Games</option>
        </select>

        <select className='filter-option' onChange={(e) => (handleFilterGameByGenre(e))}>
          <option value='all-genres'>All Genres</option>
            {genres.map((genre) => {
              return (
                <option value={genre.name} >{genre.name} </option>
              )
            })}
        </select>
      </div>

      <Paginado
        gamesPerPage = {gamesPerPage}
        allGames = {allGames.length}
        paginado = {paginado}
        currentPage = {currentPage}
      />

      <ul className='card'>
      {currentGames.length > 0 ? currentGames.map((el) => {
        return ( 
          <li className='card-li'>          
            <Card 
              name = {el.name} 
              image = {el.image} 
              genres = {!el.createdInDB ? el.genres : el.genres.map(el => el.name)}  
              platforms = {el.platforms + (',  ')}  
              rating = {el.rating}
              id = {el.id}
              key = {el.id}/>
          </li>                      
        )}) : <span class="loader-home"></span>
      } 
      </ul>  
      
      <br></br>
      <Footer/>
    </div>
  )
}
