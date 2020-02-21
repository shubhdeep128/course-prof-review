import React , {Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../utils/API.js'

class CourseList extends Component {
    state={
        loadStatus:false,
        courses: [],
        error:false
      }
      componentDidMount(){
        this.setState(this.props.location.state)
        API.get('/api/course').then((response) => {
          this.setState({error:false, courses:response.data, loadStatus:true});
          console.log(response.data);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
          window.location = '/course'
        });
      }
  
  render(){
    var courses = this.state.courses;
    if(this.state.loadStatus==true){
      courses = courses.map(function(course){
        return(
          <EachCourse course_id={course._id} name={course.Name} grading={course.Average_grading}/>
        )
      }.bind(this));
    }
    
    return(
      <div className="course-list">
          {courses}
      </div> 
    );
  }
}



export default CourseList;