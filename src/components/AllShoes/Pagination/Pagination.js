import React,{useState, useEffect} from 'react'
import { useLocation, useHistory } from 'react-router';
import './Pagination.css';

const Pagination = ({data,pageLimit, RenderComponent, dataLimit, shouldChange, pageId, searchTerm, ...rest}) => {
    const pages = Math.round(data.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(pageId);
    const location = useLocation();
    let history = useHistory();
    useEffect(() => {
        setCurrentPage(pageId);
        console.log(`u use effectu paginacije si, a search term ti iznosi ${searchTerm}`);

        if(searchTerm != '' || searchTerm != undefined){
            setCurrentPage(currentPage => currentPage = 1);
            redirectPage(1);
        }
    },[shouldChange, searchTerm]);
    
    function goToNextPage(){
        let pageNumber = currentPage + 1;
        setCurrentPage(pageNumber);
        redirectPage(pageNumber);
    }

    function goToPreviousPage(){
        let pageNumber = currentPage - 1;
        setCurrentPage(pageNumber);
        redirectPage(pageNumber);
    }

    function changePage(event){
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        redirectPage(pageNumber);
    }

    function redirectPage(pageNumber) {
        history.push(`${location.pathname}?p=${pageNumber}&search=${searchTerm ? searchTerm : ""}`);
        //history.push(`${location.pathname}?p=${pageNumber}`);
    }
 
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit * pageLimit);
        if(start >= 3){
            start = start - 3;
        }
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1).filter(v => v < pages);
    };

    return(
        <>
      {getPaginatedData().map((d, idx) => (
        <RenderComponent key={idx}
            id={idx}
            data = {d}
            {...d}
            {...rest}
        />
      ))}
        <div className="pagination">
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                prev
            </button>
            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                    <span>{item}</span>
                </button>
            ))}
        <button
                onClick={goToNextPage}
                className={`next ${currentPage >= pages ? 'disabled' : ''}`}
            >
                next
        </button>
            
        </div>
        </>
    )
}

export default Pagination;