import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './CardContainer.css';
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import Dropdown from 'react-bootstrap/Dropdown';



export default function CardContainer() {
  const dispatch = useDispatch()
  const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1);

  const [refresh, setRefresh] = useState(1)

  useEffect(() => {
    
    setCurrentPage(1)
    setRefresh(refresh + 1)
  }, [allInstruments])

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  let idxLastItem = currentPage * 15
  let ixdFirstItem = idxLastItem - 15
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem)

  let mapInstruments = pageInstruments.map(instrument => <ProductCard
    key={instrument._id}
    id={instrument._id}
    name={instrument.name}
    price={instrument.price}
    brand={instrument.brand}
    rating={1}
    image={instrument.image} />)

  const paginate = (number) => { setCurrentPage(number) }

  return (
    <div className="containerHome">
      <Dropdown className="orderButton" size="sm">
        <Dropdown.Toggle variant="success" className="toglleDropDown" id="dropdown-basic">
          Order By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item >Ordenamiento 1</Dropdown.Item>
          <Dropdown.Item >Ordenamiento 2</Dropdown.Item>
          <Dropdown.Item >ORdenamiento 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {mapInstruments ?
        <div className="containerContent">
          <Filters />
          <div className="containerCards">
            {mapInstruments}
          </div>
        </div>
        : <Loading />}

      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} refresh={refresh}/>
    </div>
  )
}