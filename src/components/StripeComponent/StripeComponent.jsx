/* eslint-disable react-hooks/exhaustive-deps */
/* 
    Dependencias de stripe: @stripe/react-stripe-js @stripe/stripe-js
    bootswatch lireria con temas de bootstrap
*/

import axios from 'axios';
import { useEffect } from 'react';
import { getProductById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import "bootswatch/dist/lux/bootstrap.min.css";

const stripePromise = loadStripe('pk_test_51LZlZLAfFn4zXQabU5GwZV9N2mF4rWwZiphhNImIDe3ClFcAcspjPLm2unNFM81E9ljcZfjf2BBhb6L2UW3Vin6G00c54G75HA');

function StripeComponent() {
    const dispatch = useDispatch();
    const instrumentItem = useSelector((state) => state.retrievedInstrument);
    const { id } = useParams();

    useEffect(() => {
        if (!instrumentItem || (id !== instrumentItem._id && !instrumentItem.error)) {
            dispatch(getProductById(id));
        }
    }, [dispatch, instrumentItem])

    function CheckoutForm() {

        const stripe = useStripe();
        const elements = useElements();

        if (elements == null) return;

        const handleSubmit = async (event) => {
            event.preventDefault();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })
            if (!error) {
                try {
                    const { data } = await axios.post('http://localhost:3001/api/checkout', {
                        id: paymentMethod.id,
                        amount: instrumentItem.price * 100,   // price in cents
                        idprod: instrumentItem._id                  // pasar id
                    })
                    console.log(data.message);  // success?

                    elements.getElement(CardElement).clear();
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return (
            <form onSubmit={handleSubmit} className="card card-body">
                <img src={instrumentItem.image} alt="product ofer" className='img-fluid m-2' />

                <div className="form-group">
                    <h3 className='text-center m-2'>
                        Price: {instrumentItem.price}
                    </h3>
                </div>

                <div className='form-group m-2'>
                    <CardElement className='form-control' />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || !elements}
                    className="btn btn-success m-2"
                >
                    buy
                </button>
            </form>
        )
    }

    return (
        instrumentItem ?
            (
                <div className="App">
                    <Elements stripe={stripePromise}>
                        <div className='container p-4'>
                            <div className='row'>
                                <div className="col-md-4 offset-md-4">
                                    <CheckoutForm />
                                </div>
                            </div>
                        </div>
                    </Elements>
                </div>
            )
            : <span>Loading...</span>
    );
}

export default StripeComponent;
