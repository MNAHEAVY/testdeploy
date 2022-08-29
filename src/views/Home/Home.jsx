// React utilities
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
// Components
import ProductCard from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "../../components/Filters/Filters";
import Loading from "../../components/Loading/Loading";
import NothingFound from "../../components/NothingFound/NothingFound";
// Actions
import { 
  orderProducts,
  getAllProducts,
  filteredIntruments,
  activeLoading
} from '../../redux/actions';
// Styles
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

export default function Home() {
  
  //Hooks
  const dispatch = useDispatch();
  const allInstruments = useSelector(state => state.instruments);
  const isLoading = useSelector(state => state.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
    // Getting value of the query from the url
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (search) {
      dispatch(filteredIntruments({name: search}));
    } else {
      dispatch(getAllProducts());
    }
    dispatch(activeLoading());
  }, [dispatch, search]);

  useEffect(() => {
    setCurrentPage(1)
  }, [allInstruments]);

  useEffect(() => {
    window.scrollTo({ top: '0px', behavior: 'smooth' });
  }, [currentPage]);

  //Order's Dispatch
  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderProducts(e.target.value));
  }

  // Pagination logic
  let idxLastItem = currentPage * 15;
  let ixdFirstItem = idxLastItem - 15;
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem);
  const paginate = (number) => { 
    setCurrentPage(number) 
  };

  return (
    <div className="containerHome">
      { isLoading ? <Loading /> : 
        <>
          <div className="aditionalContent">
            { search ? 
              <div className="numberOfResults">
                {allInstruments.length} results of ""<span>{search}</span>""
              </div> : null
            }
            
            <FormControl 
              variant="standard" 
              sx={{ m: 1, minWidth: 90 }} 
              size="small"
              className={allInstruments.length ? null : "ocult"}
            >
              <InputLabel id="demo-simple-select-label">Order by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Order by"
                onChange={(e) => { handleOrder(e) }}
              >
                <MenuItem value="Lower price">Price: Low to High</MenuItem>
                <MenuItem value="Higher price">Price: Hig to Low</MenuItem>
                <MenuItem value="Down to Up">Name: A-Z</MenuItem>
                <MenuItem value="Up to Down">Name: Z-A</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          { allInstruments.length ?
            <>
              <div className="containerContent">
                <Filters />
                <div className="containerCards">
                  {
                    pageInstruments?.map(instrument => {
                      return (
                        <ProductCard
                          key={instrument._id}
                          id={instrument._id}
                          name={instrument.name}
                          price={instrument.price}
                          brand={instrument.brand}
                          rating={Math.floor((Math.random() * 6))}
                          image={instrument.image}
                        />
                      )
                    })
                  }
                </div>
              </div>
              <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />
            </>
            : <NothingFound />
          }
        </>
      }
    </div>
  )
}