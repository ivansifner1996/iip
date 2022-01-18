import React, {useState, useEffect, useCallback} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseService from "../../backend/firebaseService";
import Product from './Product';
import Pagination from '../AllShoes/Pagination/Pagination';
import SpecificProduct from './SpecificProduct';

const ProductList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    useEffect(() => {
        console.log("rerender");
        getProducts();
    }, []);

    const getProducts = async() => {
      firebaseService.getAll().on("value", onDataChange);

        return () => {
          console.log("cleanup");
          firebaseService.getAll().off("value", onDataChange);
        };
    }

    const changeProduct = useCallback((tutorial, index) => {
      setActiveTutorial(tutorial, index)
    }, [])

    const onDataChange = async(items) => {
       let products = [];
       items.forEach((item) => {
           let key = item.key;
           let data = item.val();
           products.push({
               id : data.id,
               category : data.category,
               key : key,
               title : data.title,
               before : data.before,
               after : data.after,
               link : data.link
           })
       })
       setTutorials(...tutorials, products);
    }


    const refreshList = () => {
        setCurrentIndex(-1);
        setCurrentTutorial(null);
    }

    const setActiveTutorial = (tutorial, index) => {
        console.log(`argumenti su ti ${tutorial}, a index ${index}`);
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
        console.log(tutorial);
    }

    const removeAllTutorials = () => {
        firebaseService.deleteAll()
            .then(() => {refreshList();
            }).catch((e) => {
                console.log(e);
            });
    }

 /*
  const listFromStorage = async() => {
    let result = await firebaseService.getStorage().ref().child('/posts/ivansifner@gmail.com').listAll();
    let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    return Promise.all(urlPromises);
  }
  */
    return (
        <div className="list row">
        <div className="col-md-6">
          <h4>Popis proizvoda</h4>

          <ul className="list-group">
              {tutorials &&
                <Pagination
                  RenderComponent={SpecificProduct}
                  data = {tutorials}
                  pageLimit = {5}
                  dataLimit = {5}
                  changeProduct = {changeProduct}
                  currentIndex = {currentIndex}
                  pageId = {1}
                  tutorials = {tutorials}
                  currentTutorial = {currentTutorial}

                />
              }
          </ul>
          <div style={{display:'flex', justifyContent:'center',marginTop: '10px'}}>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
            style={{borderRadius: '10px'}}
          >
            Ukloni sve
          </button>
          </div>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <Product
              tutorial={currentTutorial}
              refreshList={refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Kliknite na proizvod...</p>
            </div>
          )}
          </div>        
      </div>
    )
}

export default ProductList
