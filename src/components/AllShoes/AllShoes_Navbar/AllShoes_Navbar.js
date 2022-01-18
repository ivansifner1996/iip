import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import './AllShoes_Navbar.css'

const AllShoes_Navbar = React.memo(({title, listOfPaths, type, resetPage}) => {

    const [shoesBar, setShoesBar] = useState(false);
    const newStyle = {
      textDecoration: 'none',
      cursor: 'default', 
      pointerEvents: 'none',
      color: 'green'
    }
    const showShoesBar = () => setShoesBar(!shoesBar);
    
    function setIdToDisable(idx){
      let element = document.getElementsByClassName('navElement');
      console.log(idx);
      for(var property in newStyle){
        element[idx][property] = newStyle[property];
      }
    }
    
    return (
        <>
        <div className="allShoesNavbar">
        <span className="allShoesNavbar__section">{title} odjeca</span>
        <div className="allShoesNavbar__category">
          {
            listOfPaths.map((paths, idx) => (
          <NavLink className="navElement" activeClassName="allShoesNavbar__active" to={`/category/${type}${paths.path}?p=1`} onClick={resetPage, () => setIdToDisable(idx)}  style={{textDecoration : 'none'}} >
            <span className="allShoesNavbar__items">{paths.titleName}</span>
          </NavLink>
            ))}
        </div>
      </div>

      <div className={shoesBar ? 'allShoesNavbar2 active' : 'allShoesNavbar2'}>
      <span className="allShoesNavbar2__section">{title} odjeca</span>
        <div className="allShoesNavbar2__category">
          {
            listOfPaths.map((paths, idx) => (
          <NavLink className="navElement" activeClassName="allShoesNavbar2__active" to={`/category/${type}${paths.path}?p=1`} onClick={resetPage, () => setIdToDisable(idx)} style={{textDecoration: 'none'}} >
            <span className="allShoesNavbar2__items">{paths.titleName}</span>
          </NavLink>
            ))}
        </div>
      </div>
      </>      
    )
});

export default AllShoes_Navbar
