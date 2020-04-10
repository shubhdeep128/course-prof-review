import React,{Component} from 'react';
import styles from './Reviews.css';

class Reviews extends Component {
    render() {
        console.log(this.props)
        return (
            <div class = 'review-container'>
                <div class = "columns is-vcentered is-mobile">
                    <div class = "column is-2">
                        <div class = "review-circle">
                            <div class = "review-circle-text"> {this.props.rating}</div>
                        </div>
                    </div>
                    <div class = "column">
                        <div class = "review-desc is-italic">
                            <span class = " has-text-weight-semibold">"</span>
                            {this.props.desc}
                            <span class = "">"</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;