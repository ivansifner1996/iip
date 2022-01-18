import React from 'react'

const SpecificProduct = ({title, id, changeProduct, currentIndex,data}) => {
    return (
        <div>
            {
                <li
                  className={
                    "list-group-item " +
                    (id === currentIndex ? "active" : "")
                  }
                  onClick={() => changeProduct(data, id)}
                  key={id}
                >
                  {title}
                </li>
}
        </div>
    )
};

export default SpecificProduct
