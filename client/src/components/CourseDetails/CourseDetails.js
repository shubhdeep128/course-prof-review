import React, { Component } from 'react';
import API from '../../utils/API.js';
import OuterContainer from  '../OuterContainer/OuterContainer.js'
import styles from "../../mystyles.css"
import axios from 'axios';
import Reviews from './Reviews.js';
class CourseDetails extends Component {
    state = {
        loadstatus : false,
        course: [],
        resData : [],
        reviews: [],
        error : false,
        current_user : ''
    }
    handleSubmit(e){
        e.preventDefault();
        var desc = this.refs.desc.value;
        var rating = this.refs.rating.value;
        const { match: { params } } = this.props;
        API.post('/api/review/add', {
            Parent : params.courseid,
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
            axios.get(`/api/course/${params.courseid}`),
            axios.get("/api/current_user")
        ])
        .then(responseArr => {
            this.setState({error:false, resData:responseArr[0].data, course:responseArr[0].data.course, reviews: responseArr[0].data.reviews, loadStatus:true, current_user: responseArr[1].data._id});
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
        console.log(course)
        if(this.state.loadStatus===true){
            review = review.map(function(review){
              return(
                <Reviews author = {review.Author} time = {review.Time_stamp} desc = {review.Description} difficulty = {review.Difficulty} rating = {review.rating} upvotes = {review.Votes.up_vote} downvotes = {review.Votes.down_vote} />
                )
            }.bind(this));
          }


        console.log(review)
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
        return(
            <div class=  "has-background-grey-darker">
        
            <OuterContainer/>
    
                <div class = "column is-full has-text-primary has-text-centered is-size-1 has-text-weight-semibold"> 

                <div class="card ">
                    <div class="card-content has-background-success">
                        <p class="title">
                            {this.state.course.Name}
                        </p>
                        <p class="subtitle">
                        {this.state.course.Description}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            <p class = "title"><span class = "is-size-6">Rating</span><br/> <span class = "has-text-weight-bold">{this.state.course.Rating}</span></p>
                        </p>
                        <p class="card-footer-item">
                        <span>
                        <p class = "title"><span class = "is-size-6">Average Grade</span><br/> <span class = "has-text-weight-bold">{this.state.course.Average_grade}</span></p>
                            
                        </span>
                        </p>
                    </footer>
                    </div>
                </div>
            
            <div class = "columns is-3">
                <div class = "column has-text-centred"> 
        <nav class = "level">{course_tags}</nav>
                </div>
            </div>
                <div class = "Form">
                    <form onSubmit = {this.handleSubmit}>
                        <input type = "text" placeholder = "Give your Review" ref = "desc" id = "desc"></input>
                        <input type = "number" placeholder = "Rating" ref = "rating" id = "rating"></input>
                        <input type = "Submit" value = "submit" data-cy-review-button />
                    </form>
                </div>
                <div class = "Review"> {review} </div>
                
        
            </div>
        );
    }

}
export default CourseDetails;