import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Pagination from "../Pagination";
import ProductCard from "../Card";
import './Favorites.css';


function Favorites() {

    const favoriteInstruments = useSelector(state => state.favoriteInstruments);
    const pageSize = 15;
    const totalPosts = favoriteInstruments.length;
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect( () =>{
        if (favoriteInstruments.length !== 0 ) {
            changePage(pageNumber);
        }
    }, [favoriteInstruments])

    function changePage(newPageNumber) {
        const indexEnd = newPageNumber * pageSize;
        const indexIni = indexEnd - pageSize;
        setCurrentPage(favoriteInstruments.slice(indexIni, indexEnd));
        setPageNumber(newPageNumber);
    }

    function renderInstruments() {
        if (favoriteInstruments.length === 0) {
            return (
                <h4>
                    The favorites list is empty.
                </h4>
            );
        }

        let instrumentsMap = currentPage.map(instrument => <ProductCard
            key={instrument.id}
            id={instrument.id}
            name={instrument.name}
            price={instrument.price}
            brand={instrument.brand}
            rating={1}
            image={instrument.image} />);

        return (
            <div>
                <Pagination currentPage={currentPage}
                            postPerPage={pageSize}
                            totalPosts={totalPosts}
                            paginate={changePage}/>

                <div className="favoriteCards">
                    {instrumentsMap}
                </div>
                <Pagination currentPage={currentPage}
                            postPerPage={pageSize}
                            totalPosts={totalPosts}
                            paginate={changePage}/>
            </div>
        );
    }


    return (
        <div className="containerHome">
            <h1>Favorites</h1>
            {renderInstruments()}
        </div>
    );
}

export default Favorites;
