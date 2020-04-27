import React, { Component } from 'react';
import API from '../../../utils/API.js';
import axios from 'axios';
import Reviews from './Reviews.js';
import ProfHeader from './ProfHeader.js'
import AddReview from "./AddReview";
class ProfDetails extends Component {
    state = {
        loadstatus : false,
        prof: [],
        resData : [],
        reviews: [],
        error : false,
    }
    handleSubmit(e){
        e.preventDefault();
        var desc = this.refs.desc.value;
        var rating = this.refs.rating.value;
        const { match: { params } } = this.props;
        API.post('/api/review/add', {
            Parent : params.profid,
            Author: this.state.current_user,
            Time_stamp : Date.now,
            Description : desc,
            Difficulty : 10,
            Rating : rating,
            Votes : {
                up_vote : 0,
                down_vote : 0
            }
          }).then(function (response) {
              console.log(response);
            window.location.reload(false)
          }).catch(function (error) {
            console.log(error);
          });
        
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        axios.all([
            axios.get(`/api/prof/${params.profid}`),
            axios.get("/api/current_user")
        ])
        .then(responseArr => {
            this.setState({error:false, resData:responseArr[0].data, prof:responseArr[0].data.prof, reviews: responseArr[0].data.reviews, loadStatus:true, current_user: responseArr[1].data._id});
            console.log(this.state.resData);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
    }

    

    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        var prof = this.state.prof 
        var review= this.state.resData.reviews
        console.log(prof)
        if(this.state.loadStatus===true){
            review = review.map(function(review){
              return(
                <Reviews author = {review.Author} time = {review.Time_stamp} desc = {review.Description} difficulty = {review.Difficulty} rating = {review.Rating} upvotes = {review.Votes.up_vote} downvotes = {review.Votes.down_vote} />
                )
            });
          }

        var prof_tags = this.state.prof.Relevant_tags
        if(this.state.loadStatus===true){
            prof_tags = prof_tags.map(function(tag){
              return(
                <div className="level-item has-text-centered">
                    <div>
                    <span className = "tag is-large is-link">{tag}</span>
                    </div>
                </div>
                
              )
            }.bind(this));
          }
          
        return(
            <div>
        
                <ProfHeader prof = {this.state.prof} />
                
                <nav class = "level">
                  <div class = "level-left">
                    <div class = "level-item">
                      <div class = "review-heading"><span class = "has-text-weight-semibold">Reviews</span></div>
                    </div>
                  </div>
                  <div calss = "level-right">
                    <div class = "level-item">
                      <div class = "add-review"><AddReview loginStatus = {this.props.loginStatus} current_user = {this.props.current_user} prof_id = {this.state.prof._id} prof_rating = {this.state.prof.Rating} course_revCount = {this.state.prof.revCount} /></div>
                    </div>
                  </div>
                </nav>
                <div className = "Review"> {review} </div>
                <footer className="footer">
                  <div className="content has-text-centered">
                    <p>
                      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                    </p>
                  </div>
                </footer>
            </div>
        );
    }

}
export default ProfDetails;