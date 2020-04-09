import React,{Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../../utils/API.js'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

class CourseCrud extends Component {

  state={
      loadStatus:false,
      courses: [],
      error:false,
      current_user: {}
    }
    onDelete = (id) => {
      this.setState(this.props.location.state)
      API.delete(`/api/course/${id}`).then((response) => {
          console.log(response);
          alert("Course Deleted!!")
      })
    }
    componentDidMount(){
      const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        axios.all([
            axios.get("/api/course/"),
            axios.get("/api/current_user")
        ])
        .then(responseArr => {
            this.setState({error:false, courses:responseArr[0].data,  loadStatus:true, current_user: responseArr[1].data});
            console.log(responseArr);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
      
    }
  render(){

    var courses = this.state.courses;
    var string = '/admin/courses/'
    var courses = this.state.courses;
    if(this.state.loadStatus===true){
      courses = courses.map(function(course){
        return(
          <div class = "tile">
            <EachCourse tags={course.Relevant_tags} name={course.Name} desc={course.Description} prof = {course.Current_professor} grade = {course.Average_grading} rating = {course.Rating} course_id={string+course._id} onClick={this.onDelete.bind(this,course._id)}/>
          </div>
          
        )
      }.bind(this));
    }
    if(this.state.current_user.Roles != 'Admin'){
      console.log(this.state.current_user.Roles)
      return(
          <div>
              Unathorized
          </div>
      )
  }
    return(
        <div class = "container">
          <a href="/admin/courses/add">Add a Course</a>
          {courses}   
        </div>
    )
  }
}

export default CourseCrud;