import React,{Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../../utils/API.js'
import axios from 'axios';
import './CourseCrud.css'
class CourseCrud extends Component {

  state={
      loadStatus:false,
      courses: [],
      error:false,
      current_user: {},
      professors: [],
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
        axios.all([
            axios.get("/api/course/"),
            axios.get("/api/current_user"),
            axios.get("/api/prof")
        ])
        .then(responseArr => {
            this.setState({error:false, courses:responseArr[0].data,  loadStatus:true, current_user: responseArr[1].data.user, professors: responseArr[2].data});
            console.log(responseArr[2]);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
      
    }
  render(){

    var courses = this.state.courses;
    var string = '/admin/courses/update/'
    if(this.state.loadStatus === true){
      courses = courses.map(function(course, i){
        return(
          <div className = "tile" key = {i}>
            <EachCourse professors = {this.state.professors} tags={course.Relevant_tags} name={course.Name} desc={course.Description} prof = {course.Current_Professor} grade = {course.Average_grade} rating = {course.Rating} course_id={string+course._id} onClick={this.onDelete.bind(this,course._id)}/>
          </div>
          
        )
      }.bind(this));
    }
    if(this.state.current_user.Roles !== 'Admin'){
      console.log(this.state.current_user.Roles)
      return(
          <div>
              Unathorized
          </div>
      )
  }
    return(
        <div >
          <div className = "container">
          <a className = "button is-large is-black is-rounded" href="/admin/courses/add">Add a Course</a>
          {courses}   
          </div>
        </div>
    )
  }
}

export default CourseCrud;