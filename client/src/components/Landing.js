import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Landing.css';
;
export const Landing = () => {
  return (
    <div className='container-all'>

      <Link to = '/home'>
        <button href className='btn-neon-land'>
          <span id='span1'></span>
          <span id='span2'></span>
          <span id='span3'></span>
          <span id='span4'></span>
          Let's play!
        </button>      
      </Link>

      <span class="loader-land"></span>
    </div>
  )
}
