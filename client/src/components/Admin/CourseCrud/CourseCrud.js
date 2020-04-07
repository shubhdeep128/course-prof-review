import React,{Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../../utils/API.js'
import { Link, Redirect } from 'react-router-dom'

class CourseCrud extends Component {

  state={
      loadStatus:false,
      courses: [],
      loggedIn: true,
      error:false
    }
    onDelete = (id) => {
      this.setState(this.props.location.state)
      API.delete(`/api/course/${id}`).then((response) => {
          console.log(response);
          alert("Course Deleted!!")
      })
    }
    componentDidMount(){
      this.setState(this.props.location.state)
      API.get('/api/course').then((response) => {
        this.setState({error:false, courses:response.data, loadStatus:true});
        console.log(response.data);
      }).catch(function (error) {
        console.log("ERROR LOADING DATA");
        console.log(error);
      });
      
    }
  render(){
    const token = localStorage.getItem("token")
    if(token == null){
      this.state.loggedIn = false
    }
    if(this.state.loggedIn === false){
        return <Redirect to = "/admin/login"></Redirect>
    }
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
    return(
        <div>
          <a href="/admin/courses/add">Add a Course</a>
          {courses}   
        </div>
    )
  }
}

export default CourseCrud;