// React utilities
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Actions
import { 
    filteredIntruments
} from '../../redux/actions';
// Styles
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import CloseButton from 'react-bootstrap/CloseButton';
import './Filters.css';

export default function Filters() {

    const dispatch = useDispatch();
    const [select, setSelect] = useState({ 
        price: '',
        brand: '', 
        status: '', 
        categorie: '',
        color: ''
    });

    function handleSelect(e) {
        setSelect((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
        let actualSelect = {[e.target.name]: e.target.value }
        dispatch(filteredIntruments(actualSelect));
    }

    return (
        <div className='containerFilters'>

            <div className='selectedFilters'>
                { Object.entries(select).map(prop => {
                    return (
                        prop[1] ? 
                        <div className='activeFilter'>
                            {prop[1]}
                            <CloseButton />
                        </div>
                        : null
                    )
                })}
            </div>

            <Accordion className="accordion" defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="1">
                    <AccordionHeader>Price</AccordionHeader>
                        <AccordionBody>
                            <p>Filtro de precio, pronto disponible</p>
                        </AccordionBody>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Brand</Accordion.Header>
                    <Accordion.Body>
                        <select value={select.brand} onChange={(e) => { handleSelect(e) }} name="brand" id="select">
                            <option value=''>All Brands</option>
                            <option value="Fender">Fender</option>
                            <option value="Ibanez">Ibanez</option>
                            <option value="Carlo Robelli">Carlo Robelli</option>
                            <option value="Yamaha">Yamaha</option>
                            <option value="Takamine">Takamine</option>
                            <option value="Sturgis">Sturgis</option>
                            <option value="Sala Muzik">Sala Muzik</option>
                            <option value="Naad">Naad</option>
                            <option value="MoonAngel">MoonAngel</option>
                            <option value="SUTILA">SUTILA</option>
                            <option value="Jupiter">Jupiter</option>
                            <option value="Honner">Honner</option>
                            <option value="HandCraftoria">HandCraftoria</option>
                            <option value="Pacific Drums">Pacific Drums</option>
                            <option value="Tama">Tama</option>
                            <option value="RockJam">RockJam</option>
                            <option value="Generic">Generic</option>
                        </select>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Status</Accordion.Header>
                    <Accordion.Body>
                        <select value={select.status} onChange={(e) => { handleSelect(e) }} name="status" id="stat">
                            <option value="">All</option>
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                        <select value={select.categorie} onChange={(e) => { handleSelect(e) }} name="categorie" id="cat">
                            <option value="">All Categories</option>
                            <option value="String">String</option>
                            <option value="Percussion">Percussion</option>
                            <option value="Wind">Wind</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <AccordionHeader>Color</AccordionHeader>
                        <AccordionBody>
                            <p>Filtro de color, pronto disponible</p>
                        </AccordionBody>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}