import React, { Component } from 'react';
import API from '../../../utils/API.js';
import Loading from '../../Loading'
import Reviews from './Reviews.js';
import CourseHeader from './CourseHeader'
import AddReview from "./AddReview";

class CourseDetails extends Component {

    state = {
        loadStatus : false,
        course: [],
        resData : [],
        reviews: [],
        prof:[],
        error : false
    
    }
    handleSubmit(e){
        e.preventDefault();
        var desc = this.refs.desc.value;
        var rating = this.refs.rating.value;
        const { match: { params } } = this.props;
        API.post('/api/review/add', {
            Parent : params.courseid,
            Author: this.props.current_user._id,
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
          API.get(`/api/course/${params.courseid}`)
        .then(responseArr => {
            this.setState({error:false, resData:responseArr.data, course:responseArr.data.course, reviews: responseArr.data.reviews,prof: responseArr.data.prof, loadStatus:true});
            console.log(responseArr);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
        },1200)
        
    }

    

    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        var state = this.state;
        var props = this.props;
        var review= this.state.resData.reviews
        var reviews = review
        var current_user_review = false;
        console.log(this.props)
        if(this.state.loadStatus===true){
            review = review.map(function(review , i){
              
              return(
                <Reviews key = {i} author = {review.Author} time = {review.Time_stamp} desc = {review.Description} difficulty = {review.Difficulty} rating = {review.Rating} upvotes = {review.Votes.up_vote} downvotes = {review.Votes.down_vote} current_user = {props.current_user} review_id = {review._id} loginStatus = {props.loginStatus} course_id = {state.course._id} course_rating = {state.course.Rating} course_revCount = {state.course.revCount}/>
                )
            });
            for(var i=0; i<reviews.length;i++)
            {
              if(reviews[i].Author === this.props.current_user._id && current_user_review === false && this.props.current_user.name !== "Test User" )
              {
                current_user_review = true
              }
            }

          }
          
        
        
        var course_tags = this.state.course.Relevant_tags
        if(this.state.loadStatus===true){
            course_tags = course_tags.map(function(tag,i){
              return(
                    <span className = "tag is-large is-link">{tag}</span>
              )
            });
          }
        
        return(
            <div>
              {!this.state.loadStatus?(
              <div className = "columns is-centered is-mobile">
                <div className = "column is-11">
                  <div className = "courseDetail-box box has-text-centered">
                    <Loading  type = {"spin"} />
                  </div>
                </div>
              </div>):
              (<div>
                <CourseHeader course_tags = {course_tags} course = {this.state.course} prof = {this.state.prof}/>
              </div>)}
                <nav className = "level">
                  <div className = "level-left">
                    <div className = "level-item">
                      <div className = "review-heading"><span className = "has-text-weight-semibold">Reviews</span></div>
                    </div>
                  </div>
                  <div className = "level-right">
                    <div className = "level-item">
                      <div className = "add-review"><AddReview loginStatus = {this.props.loginStatus} current_user = {this.props.current_user} course_id = {this.state.course._id} course_rating = {this.state.course.Rating} course_revCount = {this.state.course.revCount} current_user_review = {current_user_review} /></div>
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
export default CourseDetails;