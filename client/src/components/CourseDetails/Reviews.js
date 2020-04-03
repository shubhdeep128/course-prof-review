import React,{Component} from 'react';
import styles from './Reviews.css';

class Reviews extends Component {
    render() {
        return (
            <div class = 'review-container'>
    <div class = 'author'>{this.props.author}</div>
        <div class = 'time'>Given on {this.props.time}</div>
        <div class = 'description'>{this.props.desc}</div>
    <div class = 'difficulty'>{this.props.difficulty}</div>
    <div class = 'rating'> {this.props.rating} </div>
        <div class = 'votes'>
            <div class = 'upvotes'>
                Upvotes : {this.props.upvotes}
            </div>
            <div class = 'downvotes'>
                Downvotes : {this.props.downvotes}
            </div>
        </div>
        <hr></hr>
            </div>
        )
    }
}

export default Reviews;