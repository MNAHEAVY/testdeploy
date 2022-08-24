import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getProductById, updateProduct} from "../../redux/actions";
import './ProductEdit.css';
import Loading from "../../components/Loading";

function ProductEdit() {

    const regexInteger = /^\d*$/;
    const regexDecimal = /^(\d+\.?\d*|\.\d+)$/;
    const regexAlphanumeric = /^[\dA-Za-záéíóúüñç\-,:_;.'“”"/()&\s]*$/;
    const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z\d@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z\d@:%_+.~#?&/=]*)/g;

    const dispatch = useDispatch();
    const instrumentRetrieved = useSelector((state) => state.retrievedInstrument);
    const {id} = useParams();
    const navigate = useNavigate();

    const [instrumentItem, setInstrumentItem] = React.useState({
        id: 0,
        name: '',
        price: 1.0,
        description: '',
        image: [],
        stock: 0,
        color: '',
        category: [],
        brand: '',
        location: '',
        status: '',
    });

    const [errorInfo, setErrorInfo] = React.useState({
        name: '',
        price: '',
        description: '',
        image: '',
        stock: '',
        color: '',
        brand: '',
        location: '',
        status: '',
    });

    function handleChange(event) {
        setInstrumentItem({...instrumentItem, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        if (!instrumentRetrieved || (id !== instrumentRetrieved._id && !instrumentRetrieved.error)) {
            dispatch(getProductById(id));
        } else {
            setInstrumentItem(instrumentRetrieved);
        }
    }, [dispatch, instrumentRetrieved, id]);

    function renderInstrument() {
        if (!instrumentRetrieved || (id !== instrumentRetrieved._id && !instrumentRetrieved.error)) {
            return <Loading/>;
        }
        if (instrumentRetrieved.error) {
            return (
                <h4 className='instrumentErrorMessage'>
                    The requested instrument was not found.
                </h4>
            );
        }
        return renderForm(instrumentItem);
    }

    function renderProductCategories() {
        if (!instrumentItem.category || instrumentItem.category.length === 0) {
            return '';
        }
        return instrumentItem.category.map((item, index) =>
            <option key={index}
                    value={item}
            >{item}</option>
        );
    }

    function handleCategoryPlusChange(event) {
        const result = instrumentItem.category.find(item =>
            item.toLowerCase() === event.target.value.toLowerCase())
        if (result) {
            return;
        }
        setInstrumentItem({
            ...instrumentItem,
            category: [...instrumentItem.category, event.target.value]
        })
    }

    function handleCategoryMinusChange(event) {
        setInstrumentItem({
            ...instrumentItem,
            category: instrumentItem.category.filter(item =>
                item.toLowerCase() !== event.target.value.toLowerCase())
        })
    }

    function renderForm(instrumentItem) {
        return (
            <div className='editInstrumentContainer'>
                <h1 className='editInstrumentTitle'>{instrumentItem.name}</h1>

                <form onSubmit={e => handleSubmit(e)}>
                    <div className='inputLabelField'>
                        <label>Name: </label>
                        <input placeholder='Instrument name'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('name', instrumentItem.name)}
                               value={instrumentItem.name}
                               type='text' name={'name'}/>
                        <span className="errorMessage">{errorInfo.name}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Price: $</label>
                        <input placeholder='Instrument price'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateDecimal('price', instrumentItem.price)}
                               value={instrumentItem.price}
                               type='text' name={'price'}/>
                        <span className="errorMessage">{errorInfo.price}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Description: </label>
                        <textarea placeholder='Instrument description'
                                  onChange={(e) => handleChange(e)}
                                  onBlur={() => validateAlpha('description', instrumentItem.description)}
                                  value={instrumentItem.description}
                                  name={'description'}
                                  rows={4}/>
                        <span className="errorMessage">{errorInfo.description}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Image: </label>
                        <p>{instrumentItem.image} </p> {/*<input placeholder='Instrument image' //todo update - to handle array.
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateUrl('image', instrumentItem.image)}
                               value={instrumentItem.image}
                               type='text' name={'image'}/>*/}
                        <span className="errorMessage">{errorInfo.image}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Stock: </label>
                        <input placeholder='Instrument stock'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateInteger('stock', instrumentItem.stock)}
                               value={instrumentItem.stock}
                               type='text' name={'stock'}/>
                        <span className="errorMessage">{errorInfo.stock}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Color: </label>
                        <input placeholder='Instrument color'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('color', instrumentItem.color)}
                               value={instrumentItem.color}
                               type='text' name={'color'}/>
                        <span className="errorMessage">{errorInfo.color}</span>
                    </div>

                    <div className="selectGroup">
                        <div className='selectLabelField'>
                            <label>Available Categories:</label>
                            <select size={5}
                                    onChange={(e) => handleCategoryPlusChange(e)}
                            >
                                <option> Wind</option>
                                <option> Electric</option>
                                <option> Percussion</option>
                                <option> String</option>
                            </select>
                        </div>

                        <div className='selectLabelField'>
                            <label>Selected Categories: </label>
                            <select size={5}
                                    onChange={(e) => handleCategoryMinusChange(e)}
                            >
                                {renderProductCategories()}
                            </select>
                        </div>
                    </div>

                    <div className='inputLabelField'>
                        <label>Brand: </label>
                        <input placeholder='Instrument brand'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('brand', instrumentItem.brand)}
                               value={instrumentItem.brand}
                               type='text' name={'brand'}/>
                        <span className="errorMessage">{errorInfo.brand}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Location: </label>
                        <input placeholder='Instrument location'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('location', instrumentItem.location)}
                               value={instrumentItem.location}
                               type='text' name={'location'}/>
                        <span className="errorMessage">{errorInfo.location}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Brand: </label>
                        <input placeholder='Instrument status'
                               onChange={(e) => handleChange(e)}
                               onBlur={() => validateAlpha('status', instrumentItem.status)}
                               value={instrumentItem.status}
                               type='text' name={'status'}/>
                        <span className="errorMessage">{errorInfo.status}</span>
                    </div>

                    <div className="buttonsGroup">
                        <button className='submitButton' type='submit'>Save</button>
                        <button className='cancelButton'
                                type='button'
                                onClick={() => handleCancel()}
                        >Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateProduct(instrumentItem);
        if (error) {
            return;
        }
        dispatch(updateProduct(instrumentItem));
        navigate(`/detail/${id}`);
    }

    function handleCancel() {
        navigate(`/detail/${id}`);
    }

    function validateProduct() {
        const errorName = validateAlpha('name', instrumentItem.name);
        const errorPrice = validateDecimal('price', instrumentItem.price);
        const errorDescription = validateAlpha('description', instrumentItem.description);
        const errorImage = false; //validateUrl('image', instrumentItem.image[0]); //todo - update to handle array
        const errorStock = validateInteger('stock', instrumentItem.stock);
        const errorColor = validateAlpha('color', instrumentItem.color);
        const errorBrand = validateAlpha('brand', instrumentItem.brand);
        const errorLocation = validateAlpha('location', instrumentItem.location);
        const errorStatus = validateAlpha('status', instrumentItem.status);

        return errorName || errorPrice || errorDescription ||
               errorImage || errorStock || errorColor ||
               errorBrand || errorLocation || errorStatus;
    }

    function validateInteger(key, value) {
        let message = ''
        let result = false;
        if (!regexInteger.test(value)) {
            message = 'The value should contain only numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateDecimal(key, value) {
        let message = ''
        let result = false;
        if (!regexDecimal.test(value)) {
            message = 'The value should contain only decimal numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateAlpha(key, value) {
        let message = ''
        let result = false;
        if (!regexAlphanumeric.test(value)) {
            message = 'The value should contain letters and numbers.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    function validateUrl(key, value) {
        let message = ''
        let result = false;
        if (!regexUrl.test(value)) {
            message = 'The value should contain only a Url.'
            result = true;
        }
        setErrorInfo({
            ...errorInfo,
            [key]: message
        });
        return result;
    }

    return (
        <div className='ProductEdit'>
            <h1>Edit Product</h1>
            {renderInstrument()}
        </div>
    );
}

export default ProductEdit;
