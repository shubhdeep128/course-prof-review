import React, { Component } from 'react';
import Loading from '../../Loading'
import API from '../../../utils/API.js';
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
            Author: this.props.current_user,
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
        setTimeout(()=>{
          API.get(`/api/prof/${params.profid}`)
          .then(responseArr => {
              this.setState({error:false, resData:responseArr.data, prof:responseArr.data.prof, reviews: responseArr.data.reviews, loadStatus:true});
              console.log(this.state.resData);
          }).catch(function (error) {
              console.log("ERROR LOADING DATA");
              console.log(error);
            });
        },1200)
    }

    

    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        var prof = this.state.prof 
        var review= this.state.resData.reviews
        var props = this.props
        console.log(prof)
        if(this.state.loadStatus===true){
            review = review.map(function(review){
              return(
                <Reviews author = {review.Author} time = {review.Time_stamp} desc = {review.Description} difficulty = {review.Difficulty} rating = {review.Rating} upvotes = {review.Votes.up_vote} downvotes = {review.Votes.down_vote} current_user = {props.current_user} review_id = {review._id} loginStatus = {props.loginStatus} prof_id = {prof._id} prof_rating = {prof.Rating} prof_revCount = {prof.revCount} />
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
            });
          }
          
        return(
            <div>
              {!this.state.loadStatus?(
              <div className = "columns is-centered is-mobile">
                <div className = "column is-11">
                  <div className = "profDetail-box box has-text-centered">
                    <Loading  type = {"spin"} />
                  </div>
                </div>
              </div>):
              (<div>
                <ProfHeader prof_tags = {prof_tags} prof = {this.state.prof} />
              </div>)}
                <nav className = "level">
                  <div className = "level-left">
                    <div className = "level-item">
                      <div className = "review-heading"><span className = "has-text-weight-semibold">Reviews</span></div>
                    </div>
                  </div>
                  <div className = "level-right">
                    <div className = "level-item">
                      <div className = "add-review"><AddReview loginStatus = {this.props.loginStatus} current_user = {this.props.current_user._id} prof_id = {this.state.prof._id} prof_rating = {this.state.prof.Rating} prof_revCount = {this.state.prof.revCount} /></div>
                    </div>
                  </div>
                </nav>
                <div className = "Review"> {review} </div>
                <footer className="footer">
                  <div className="content has-text-centered">
                  </div>
                </footer>
            </div>
        );
    }

}
export default ProfDetails;