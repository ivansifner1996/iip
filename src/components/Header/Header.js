import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import HeaderLogo from './headerLogo.png';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from '../StateProvider/StateProvider';
import { auth } from '../../firebase';
import {useHistory} from 'react-router-dom';
import Logo from './eccomerce.png'


const Header = () => {

  const [navBar, setNavBar] = useState(false);
  const history = useHistory();
  const [{ cart, user, numOfItems }, dispatch] = useStateValue();

  const showNavBar = () => setNavBar(!navBar);

  const onLogin = () => {
    if(user) {
      dispatch({
        type: 'EMPTY_CART'
      })
      auth.signOut();
      history.push('/');
    }
  }

  return (
    <>
      <div className="header">
        <div className="header__menu">
          <MenuIcon onClick={showNavBar} style={{cursor: 'pointer'}} />
        </div>
        <Link style={{textDecoration: 'none'}} to="/">
          <img className="header__logo" src={Logo}  alt="Eccomerce logo" />
        </Link> 
        <div className="header__nav">
          <Link style={{textDecoration: 'none'}} to="/">
            <span className="header__navItems">Home</span>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/men">
            <span className="header__navItems">Muska odjeca</span>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/women">
            <span className="header__navItems">Zenska odjeca</span>
          </Link>
          <div className="header__nav">
          <Link style={{textDecoration: 'none'}} to="/promocode">
            <span className="header__navItems">Promo kod</span>
          </Link>
          </div>
          {
            user?.email === 'ivansifner96@gmail.com' &&(
              <Link style={{textDecoration: 'none'}} to="/dashboard">
                <span className="header__navItems">Dashboard</span>
              </Link>
            )
          }
        </div>
        <div className="header__navRight">
          <Link style={{textDecoration: 'none'}} to={!user && "/login"}>
            <div className="header__user" onClick={onLogin} >
              <span className="header__hello">Hello, <span className="header__mail">{user?.email}</span></span>
              <span className="header__navRightItems">{user ? 'Odjava' : 'Prijava/Registracija'}</span>
            </div>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/checkout">
            <ShoppingCartRoundedIcon className="header__cart" />
          </Link>
          <span className="header__cartItems">{numOfItems}</span>

        </div>
      </div>

      <div className={navBar ? 'header2 active' : 'header2'}>
            <div className="header2__close">
              <CloseIcon onClick={showNavBar} />
            </div>
            <div className="header2__nav">
              <Link style={{textDecoration: 'none'}} to={!user && "/login"}>
                <div className="header2__user" onClick={onLogin} >
                  <span className="header2__hello">Hello, <span className="header2__mail">{user?.email}</span></span>
                  <span className="header2__navSign">{user ? 'Odjava' : 'Prijava/Registracija'}</span>
                </div>
              </Link>
              <div className="header2__navItem">
                <Link style={{textDecoration: 'none'}} to="/" onClick={showNavBar} >
                  <span className="header2__navItems">Home</span>
                </Link>
              </div>
              <div className="header2__navItem">
                <Link style={{textDecoration: 'none'}} to="/men" onClick={showNavBar} >
                  <span className="header2__navItems">Muska odjeca</span>
                </Link>
              </div>
              <div className="header2__navItem">
                <Link style={{textDecoration: 'none'}} to="/women" onClick={showNavBar} >
                  <span className="header2__navItems">Zenska odjeca</span>
                </Link>
              </div>
            </div>
      </div>

    </>
  );
}

export default Header;