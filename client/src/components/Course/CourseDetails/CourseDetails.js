import React, { Component } from 'react';
import API from '../../../utils/API.js';
import axios from 'axios';
import Reviews from './Reviews.js';
import CourseHeader from './CourseHeader'
import AddReview from "./AddReview";
class CourseDetails extends Component {
    state = {
        loadstatus : false,
        course: [],
        resData : [],
        reviews: [],
        prof:[],
        error : false,
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
        API.get(`/api/course/${params.courseid}`)
        .then(responseArr => {
            this.setState({error:false, resData:responseArr.data, course:responseArr.data.course, reviews: responseArr.data.reviews,prof: responseArr.data.prof, loadStatus:true});
            console.log(responseArr[1]);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
    }

    

    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        var course = this.state.resData.course 
        var review= this.state.resData.reviews
        console.log(this.props)
        if(this.state.loadStatus===true){
            review = review.map(function(review){
              return(
                <Reviews author = {review.Author} time = {review.Time_stamp} desc = {review.Description} difficulty = {review.Difficulty} rating = {review.Rating} upvotes = {review.Votes.up_vote} downvotes = {review.Votes.down_vote} />
                )
            }.bind(this));
          }

        var course_tags = this.state.course.Relevant_tags
        if(this.state.loadStatus===true){
            course_tags = course_tags.map(function(tag){
              return(
                <div class="level-item has-text-centered">
                    <div>
                    <span class = "tag is-primary">{tag}</span>
                    </div>
                </div>
                
              )
            }.bind(this));
          }

          if(this.state.prof === null){
              this.state.prof = {"name":""}
          }
        return(
            <div>
        
                <CourseHeader course = {this.state.course} prof = {this.state.prof}/>
                
                <nav class = "level">
                  <div class = "level-left">
                    <div class = "level-item">
                      <div class = "review-heading"><span class = "has-text-weight-semibold">Reviews</span></div>
                    </div>
                  </div>
                  <div calss = "level-right">
                    <div class = "level-item">
                      <div class = "add-review"><AddReview loginStatus = {this.props.loginStatus} current_user = {this.props.current_user} course_id = {this.state.course._id}/></div>
                    </div>
                  </div>
                </nav>
                <div class = "Review"> {review} </div>
                <footer class="footer">
                  <div class="content has-text-centered">
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
export default CourseDetails;