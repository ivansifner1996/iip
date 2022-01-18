import React, {useEffect, useState, useCallback, useRef} from 'react';
import AllShoes from '../../AllShoes.css'
import AllShoes_Navbar from '../../AllShoes_Navbar/AllShoes_Navbar';
import ShoeComponent from '../../ShoeComponent/ShoeComponent';
import {useLocation, useParams } from 'react-router-dom';
import firebaseService from '../../../../backend/firebaseService';
import Pagination from '../../Pagination/Pagination';
import FilterSearch from '../../FilterSearch/FilterSearch';
import { useStateValue } from '../../../StateProvider/StateProvider';

const WomenCategories = () => {
  const { type } = useParams();
  const [{ searchTerm }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [shouldChange, setShouldChange] = useState(false);
  const category = 'women/'
  const prevType = usePrevious(type);
  var listOfPaths = [
    {path: 'wGym', titleName: 'Gym'},
    {path: 'wJordan', titleName: 'Jordan'},
    {path: 'wRunning', titleName: 'Running'},
    {path: 'wFootball', titleName: 'Football'},
    {path: 'wTennis', titleName: 'Tennis'},
    {path: 'wBasketball', titleName: 'Basketball'},
  ]
   useEffect(() => {
    if(prevType === type) return;
    fetchRecord(type);
  }, [type, searchTerm])
  
  const changeCategory = useCallback(() => {
    setShouldChange(!shouldChange);
    changeProductsBySearch('');
  }, []);

  const filterProducts = (search) => {
    changeProductsBySearch(search);    
  }

  const changeSearchTerm = (search) => {
    dispatch({
      type: 'FILTER_BY_SEARCH', 
      payload: search
    })
  }

  const changeProductsBySearch = (search, produkti = products) => {
      produkti.forEach(product => console.log(product.title + "product"));
      let newProducts = produkti.filter(product => 
        product.title.toLowerCase().includes(search?.toLowerCase()));
        setFilteredProducts(newProducts);
        changeSearchTerm(search);
  }
  function usePrevious(value){
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let page = Number(query.get("p"));
  const search = query.get("search") || '';


  const fetchRecord = async() => {
      const specialProducts = await firebaseService.getItemsAndCategory(type, category);
      setProducts(specialProducts[0]);
      changeProductsBySearch(search, specialProducts[0]);
    }

  return (
    <div>
    <div className="allShoes">
      <AllShoes_Navbar 
        title="Zenska"
        type = "women/"
        listOfPaths = {listOfPaths}
        resetPage={changeCategory}
      />
      </div>
      <FilterSearch
          filterProducts={filterProducts}
          searchTerm = {searchTerm}
        />
      <div className="allShoes__shoes">
        <Pagination
        RenderComponent={ShoeComponent}
        data={filteredProducts}
        pageLimit={6}
        dataLimit={5}
        shouldChange = {shouldChange}
        pageId = {page}
        searchTerm = {searchTerm}
      />
      </div>
    </div>
  );
}

export default WomenCategories;