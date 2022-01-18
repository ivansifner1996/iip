import React, {useEffect, useState, useCallback, useRef} from 'react';
import AllShoes from '../../AllShoes.css'
import AllShoes_Navbar from '../../AllShoes_Navbar/AllShoes_Navbar';
import ShoeComponent from '../../ShoeComponent/ShoeComponent';
import {useLocation, useParams } from 'react-router-dom';
import firebaseService from '../../../../backend/firebaseService';
import Pagination from '../../Pagination/Pagination';
import FilterSearch from '../../FilterSearch/FilterSearch';
import { useStateValue } from '../../../StateProvider/StateProvider';

const MenCategories = () => {
  const { type } = useParams();
  const [{ searchTerm }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [shouldChange, setShouldChange] = useState(false);
  const category = 'men/'
  const prevType = usePrevious(type);
  var listOfPaths = [
    {path: 'mGym', titleName: 'Gym'},
    {path: 'mJordan', titleName: 'Jordan'},
    {path: 'mRunning', titleName: 'Running'},
    {path: 'mFootball', titleName: 'Football'},
    {path: 'mTennis', titleName: 'Tennis'},
    {path: 'mBasketball', titleName: 'Basketball'},
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
        title="Muska"
        type = "men/"
        listOfPaths = {listOfPaths}
        resetPage={changeCategory}
      />
      <FilterSearch
          filterProducts={filterProducts}
          searchTerm = {searchTerm}
        />
      </div>
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
};

export default MenCategories;