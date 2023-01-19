import React from 'react';
import '../styles/Paginado.css';

export const Paginado = ({ gamesPerPage, allGames, paginado, currentPage }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
    pageNumber.push(i)
  }


  return (
    <div>
      <nav>
        <ul className='ul-paginated'>
          {
          pageNumber &&
          pageNumber.map(number => {
            return (
              <li key ={number}> 
                <a 
                  onClick={() => paginado(number)} 
                  key = {number} 
                  className = {currentPage  === number ? 'li-paginated-active' : 'li-paginated'}
                  href>{number}
                </a>
              </li>
            )})
          }
        </ul>
      </nav>
    </div>
  )
}
