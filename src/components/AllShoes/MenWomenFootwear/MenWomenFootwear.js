import React from 'react'
import { Link } from 'react-router-dom'
import './MenWomenFootwear.css'

const MenWomenFootwear = ({title, image, pathTo, type}) => {
    return (
        <div className="menWomenFootwear">
            <span>{title}</span>
            <Link to={`/category/${type}${pathTo}?p=1&search=`} style={{textDecoration: 'none'}}>
                <img className="shoesimage" src={image} alt="/"/>
                <div className="view">
                    <span className="menWomenFootwear__view">Kliknite za pregled</span>
                </div>
            </Link>
        </div>
    )
}

export default MenWomenFootwear
