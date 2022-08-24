import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Filters.css';
import { filteredIntruments,setFilterPath } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
export default function Filters() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.instruments)
    const [select, setSelect] = useState({ brand: '', status: '', categorie: '' });

    // const brands= ["Fender", "Ibanez","Carlo Robelli","Yamaha","Takamine","Sturgis","Sala Muzik", "Naad","MoonAngel","SUTILA","Jupiter","Honner","HandCraftoria","Pacific Drums","Tama","RockJam","Generic"]

    function handleSelect(e) {
        setSelect((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
        let actualSelect = {[e.target.name]: e.target.value }
        console.log(actualSelect)
        dispatch(filteredIntruments(actualSelect))
    }

    return (
        <Accordion className="accordion" defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="1">
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
            <Accordion.Item eventKey="2">
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
        </Accordion>
    )
}