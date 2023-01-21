import React, { useState } from 'react';
import '../styles/SearchBar.css';
import ImgSearch from '../images/search-solid.svg'
import { useDispatch } from 'react-redux';
import { searchGameName } from '../actions';
import { Link } from 'react-router-dom';


export const SearchBar = ({ searchBarPage }) => {
  
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const deleteSearch = () => {
    setSearch('');
  }

  const handleInputChange = e => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleSearchBar = (e) => {
    e.preventDefault();
    if(!search) {
      alert('Please type a game...')
      } else {
        dispatch(searchGameName(search));
        searchBarPage();
    }
  }

  
  return (
    <div>
      <nav className='container-bar-nav'>
        <a className='h2-bar-nav' href='/home'>Antonio's Games</a>
        
        <div className='container-input'>
          <input
            className='input-search-bar' 
            type='text'
            value={search}
            onChange={(e) => handleInputChange(e)}
            placeholder = 'Search games...'>
          </input>
      
          <span 
            className={search.length > 0 ? 'show-x' : 'hidden-x'}
            onClick={deleteSearch}><strong>X</strong>
          </span>

          <span>
            <img 
              className='span-search'
              onClick={(e) => handleSearchBar(e)}
              src={ImgSearch} 
              alt='Search' 
              width='40px' 
              height='70px' />
          </span>

          <a className='a-home' href='/'>Home</a>

          <Link to = {'/newGame/'} className='a-newGame'>
            <a className='a-newGame'  href='/newGame/'>New Game</a>
          </Link>
        </div>
      </nav> 
    </div>
  )
}
















