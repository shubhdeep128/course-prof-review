import React,{Component} from 'react';
import './Reviews.css';
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
            <div className = 'review-container'>
                <div className = "columns is-vcentered is-mobile">
                    <div className = "column is-2">
                        <div className = "review-circle">
                            <div className = "review-circle-text"> {this.props.rating}</div>
                        </div>
                    </div>
                    <div className = "column is-9">
                        <div className = "review-desc is-italic">
                            <span className = "has-text-weight-bold">{this.state.user.name} -</span><br/>
                            <span className = " has-text-weight-semibold">"</span>
                            {this.props.desc}
                            <span className = "">"</span>
                        </div>
                    </div>
                    <div className = "column has-text-centered">
                        <span className = "has-text-weight-bold">{this.state.upvotes}</span><br/>
                        <button className = "button is-white" onClick = {upvote}><i className="far fa-thumbs-up icon is-large"></i></button><br/>
                        <br/>
                        <button className = "button is-white" onClick = {downvote}><i className="far fa-thumbs-down icon is-large"></i></button><br/>
                        <span className = "has-text-weight-bold">{this.state.downvotes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;