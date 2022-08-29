import React, { useState, useEffect } from "react";
import './Favorites.css';
import FavCard from "../FavCard";


export default function Favorites() {

    const favoriteInstruments = JSON.parse(localStorage.getItem('favList'))

    function renderInstruments() {
        if (!favoriteInstruments) {
            return (
                <h4>
                    The favorites list is empty.
                </h4>
            );
        }

        let instrumentsMap = favoriteInstruments.map((instrument, idx) => <FavCard // usar fav card
            key={idx}
            id={instrument.id}
            name={instrument.name}
            price={instrument.price}
            brand={instrument.brand}
            rating={instrument.rating}
            image={instrument.image} />);
        return (
            <div className="favoriteCards">
                {instrumentsMap}
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
