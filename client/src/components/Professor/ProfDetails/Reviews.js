import React,{Component} from 'react';
import styles from './Reviews.css';
import API from '../../../utils/API'

class Reviews extends Component {
    state = {
        error:false,
        loadStatus: true,
        user : [],
        upvotes: this.props.upvotes,
        downvotes: this.props.downvotes
    }
    componentDidMount(){
        API.get(`/api/user/${this.props.author}`)
        .then(response => {
            this.setState({error:false, user:response.data.user, loadStatus:true});
            console.log(response);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
    }

    render() {
        const upvote = ()=>{

        }
        const downvote = ()=>{

        }
        console.log(this.props)
        return (
            <div class = 'review-container'>
                <div class = "columns is-vcentered is-mobile">
                    <div class = "column is-2">
                        <div class = "review-circle">
                            <div class = "review-circle-text"> {this.props.rating}</div>
                        </div>
                    </div>
                    <div class = "column is-9">
                        <div class = "review-desc is-italic">
                            <span class = "has-text-weight-bold">{this.state.user.name} -</span><br/>
                            <span class = " has-text-weight-semibold">"</span>
                            {this.props.desc}
                            <span class = "">"</span>
                        </div>
                    </div>
                    <div class = "column">
                        <span class = "has-text-weight-bold">{this.state.upvotes}</span><br/>
                        <a onClick = {upvote}><img src = "../thumb_up.svg"></img><br/></a>
                        <br/>
                        <a onClick = {downvote}><img src = "../thumb_down.svg"></img><br/></a>
                        <span class = "has-text-weight-bold">{this.state.downvotes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;