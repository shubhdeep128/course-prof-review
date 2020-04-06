import React, { Component } from 'react';
import API from '../../utils/API.js';
import OuterContainer from  '../OuterContainer/OuterContainer.js'
import styles from "../../mystyles.css"
class CourseDetails extends Component {
    state = {
        loadstatus : false,
        course: [],
        resData : [],
        reviews: [],
        error : false
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        API.get(`/api/course/${params.courseid}`).then((response) => {
          this.setState({error:false, resData:response.data, course:response.data.course, reviews: response.data.reviews, loadStatus:true});
        //   console.log(this.state.resData.reviews);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });

    }
    render(){
        var course = this.state.resData.course 
        var review= this.state.resData.reviews
        console.log(course)
        if(this.state.loadStatus===true){
            review = review.map(function(review){
              return(
                <div class="level-item has-text-centered">
                    <div>
                    <span class = "tag is-primary">{review.Description}</span>
                    </div>
                </div>
                
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
                <div class = "Review"> {review} </div>
            </div>
        );
    }

}
export default CourseDetails;