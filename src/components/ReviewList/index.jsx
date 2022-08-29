import React from "react";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
import {connect} from "react-redux";
import {getReviewsByProduct} from "../../redux/actions";
import './ReviewList.css';

class ReviewList extends React.Component {

    state = {reviews: 0, rating: 0.0};

    componentDidMount() {
        if (!this.props.productReviewList ||
            this.props.productReviewList.length === 0
        ) {
            this.props.getReviewsByProduct(this.props.productId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {productReviewList} = this.props;
        if (prevProps.productReviewList.length !== productReviewList.length &&
            productReviewList &&
            productReviewList.length !== 0
        ) {
            const reviewCount = productReviewList.length;
            const reviewSum = productReviewList.reduce((sum, item) => sum + item.rating, 0);
            this.setState({
                reviews: productReviewList.length,
                rating: (reviewSum / reviewCount)
            })
        }
    }

    renderReviewItem(reviewList) {
        return (
            reviewList.map((item, index) => {
                const milliseconds = Date.parse(item.updatedAt);
                const itemDate = new Date(milliseconds).toLocaleString()
                return (
                    <div className='reviewItem' key={index}>
                        <h4>{item.userName}</h4>
                        <div className="ratingUserItem">
                            <h6 className='ratingText'><b>Rating: {item.rating.toFixed(1)}</b></h6>
                            <ReactStars
                                value={item.rating}
                                edit={false}
                                size={20}
                                color1={'#888'}
                                color2={'#169E85'}
                            />
                        </div>
                        {item.updatedAt && <p><b>Date: </b>{itemDate}</p>}
                        <p><b>Comment: </b>{item.comment}</p>
                    </div>
                )
            })
        );
    }

    renderReviewList() {
        let reviewList;
        if (!this.props.productReviewList || this.props.productReviewList.length === 0) {
            reviewList = [{ //default object
                userName: 'Admin User',
                rating: 2.5,
                comment: 'Be the first one to add a review!'
            }];
        } else {
            reviewList = this.props.productReviewList;
        }
        return (
            <div className='reviewListContainer'>
                <div className="ratingTotal">
                    <h4>Rating: {this.state.rating.toFixed(1)}</h4>
                    <ReactStars
                        value={this.state.rating}
                        edit={false}
                        size={30}
                        color1={'#888'}
                        color2={'#169E85'}
                    />
                    <h4>({this.state.reviews} reviews)</h4>
                </div>
                <div className='reviewListGrid'>
                    {this.renderReviewItem(reviewList)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='Details'>
                <h1>Review List</h1>
                {this.renderReviewList()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productReviewList: state.productReviewList
    }
}

export const mapDispatchToProps = {getReviewsByProduct};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
