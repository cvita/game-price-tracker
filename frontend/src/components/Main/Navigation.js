import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import gamepad from '../../assets/gamepad.svg';
import './Navigation.css';


const Navigation = () => (
  <div className='navigation'>
    <Navbar color='faded' expand='sm'>
      <Link className='navBrand' to='/'>
        <img className='gamepad' src={gamepad} alt='Game Price Tracker' />
        <h1>Game Price Tracker</h1>
      </Link>
    </Navbar>
  </div>
);


export default Navigation;
