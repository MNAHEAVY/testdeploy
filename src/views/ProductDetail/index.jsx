/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {getProductById} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import './ProductDetail.css';
import Loading from "../../components/Loading";

function ProductDetail() {

    const dispatch = useDispatch();
    const instrumentItem = useSelector((state) => state.retrievedInstrument);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            dispatch(getProductById(id));
        }
    }, [dispatch, instrumentItem, id])

    function handleEdit() {
        navigate(`/edit/${id}`);
    }


    function renderCategories() {
        if (!instrumentItem || instrumentItem.category.length === 0) {
            return 'N/A';
        }
        return instrumentItem.category.join(',');
    }

    function renderInstrument() {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            return <Loading />;
        }
        if (instrumentItem.error) {
            return (
                <h4 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h4>
            );
        }
        return (
            <div className="detailsInfo">
                <div className="imageContainer">
                    <img className="detailsImage" src={instrumentItem.image[0]} alt="Instrument"/>
                </div>
                <div className="infoContainer">
                    <h1>{instrumentItem.name}</h1>
                    <p><b>Name: </b>{instrumentItem.name}</p>
                    <p><b>Price: $</b>{instrumentItem.price}</p>
                    <p><b>Description: </b>{instrumentItem.description}</p>
                    <p><b>Stock: </b>{instrumentItem.stock}</p>
                    <p><b>Color: </b>{instrumentItem.color}</p>
                    <p><b>Categories: </b>{renderCategories()}</p>
                    <p><b>Brand: </b>{instrumentItem.brand}</p>
                    <p><b>Location: </b>{instrumentItem.location}</p>
                    <p><b>Status: </b>{instrumentItem.status}</p>
                    <button className='submitButton'
                            type='button'
                            onClick={() => handleEdit()}
                    >Edit</button>
                </div>
            </div>
        );
    }

    return (
        <div className='Details'>
            <h1>Product Details</h1>
            {renderInstrument()}
        </div>
    );
}

export default ProductDetail;
