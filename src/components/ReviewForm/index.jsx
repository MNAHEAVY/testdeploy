import React, {useState} from "react";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
import {useDispatch, useSelector} from "react-redux";
import {addReview} from "../../redux/actions";
import {useAuth0} from "@auth0/auth0-react";
import './ReviewForm.css';

function ReviewForm(props) {

    const productId = props.productId;
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useAuth0();
    const productReviewList = useSelector(state => state.productReviewList)
    const defaultReview = {
        product: productId,
        rating: 0,
        comment: ''
    };
    const [reviewItem, setReviewItem] = useState(defaultReview);
    const [errorRating, setErrorRating] = useState('');
    const [errorComment, setErrorComment] = useState('');

    function handleCommentChange(event) {
        setReviewItem({...reviewItem, [event.target.name]: event.target.value})
    }

    function handleRateChange(newRate) {
        setReviewItem({...reviewItem, rating: newRate})
        setErrorRating('');
    }

    function validateRating(reviewItem) {
        if (reviewItem.rating === 0) {
            setErrorRating('Please assign a rating before clicking the submit button.');
            return true;
        } else {
            setErrorRating('');
            return false;
        }
    }

    function validateComment(reviewItem) {
        if (reviewItem.comment.length === 0) {
            setErrorComment('Please write a review clicking the submit button.');
            return true;
        } else {
            setErrorComment('');
            return false;
        }
    }

    function validateReview(reviewItem) {
        const resultComment = validateComment(reviewItem);
        const resultRating = validateRating(reviewItem);
        return resultRating || resultComment;
    }

    function isProductReviewed(userAuth) {
        if (productReviewList.length !== 0) {
            const result = productReviewList.filter(item =>
                item.user === userAuth.userId &&
                item.userType === userAuth.userType
            )
            return result.length !== 0;
        }
    }

    function getUserIdAndType(user) {
        const index = user.sub.indexOf("|");
        const userId = user.sub.substring(index + 1);
        const userType = user.sub.substring(0, index);
        return ({
            userId: userId,
            userType: userType
        })

    }
    function handleSubmit(event) {
        event.preventDefault();
        const error = validateReview(reviewItem);
        if (error) {
            return;
        }
        if (!isAuthenticated) {
            setErrorComment('Please log in before leaving a review.');
            return;
        }
        const userAuth = getUserIdAndType(user)
        if (isProductReviewed(userAuth)) {
            setErrorComment('It is only allowed one review per user per product.');
            return;
        }
        dispatch(addReview({
            ...reviewItem,
            user: userAuth.userId,
            userType: userAuth.userType,
            userName: user.given_name ? user.name : user.nickname,
        }));
        setReviewItem(defaultReview);
        setErrorRating('');
        setErrorComment('');
    }

    function renderReviewForm() {
        return (
            <div className='ratingContainer'>
                <form>
                    <div className='starRating'>
                        <legend>Rating: </legend>
                        <ReactStars
                            value={reviewItem.rating}
                            onChange={(newRate) => handleRateChange(newRate)}
                            edit={true}
                            size={30}
                            color1={'#888'}
                            color2={'#169E85'}
                        />
                        <span className="errorMessage">{errorRating}</span>
                    </div>

                    <div className='inputLabelField'>
                        <label>Review: </label>
                        <textarea placeholder='Write a review comment...'
                                  onChange={(e) => handleCommentChange(e)}
                                  onBlur={() => validateComment(reviewItem)}
                                  value={reviewItem.comment}
                                  rows={5}
                                  name={'comment'}/>
                        <span className="errorMessage">{errorComment}</span>
                    </div>
                </form>
                <button className='submitReviewButton'
                        type='button'
                        onClick={e => handleSubmit(e)}
                >Submit
                </button>
            </div>

        );
    }

    return (
        <div className='Details'>
            <h1>Leave a review</h1>
            {renderReviewForm()}
        </div>
    );
}

export default ReviewForm;
