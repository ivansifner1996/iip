import React from 'react'
import './FilterSearch.css'

const FilterSearch = ({filterProducts, searchTerm}) => {
    return (
        <div>
            <input
                type = "text"
                placeholder = "Pretrazite proizvod"
                value = {searchTerm}
                style={{margin: '10px auto'}}
                onChange={(e) => filterProducts(e.target.value)}
            />
        </div>
    )
}

export default FilterSearch
