import React , {Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../utils/API.js'
import OuterContainer from '../OuterContainer/OuterContainer.js'

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
          window.location = '/'
        });
      }
  
  render(){
    var courses = this.state.courses;
    if(this.state.loadStatus===true){
      courses = courses.map(function(course){
        return(
          <div class = "tile">
            <EachCourse tags={course.Relevant_tags} name={course.Name} desc={course.Description}/>
          </div>
          
        )
      }.bind(this));
    }
    
    return(
      <div>
        <div>
          <OuterContainer/>
          <section class="hero is-info">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">
                  Courses
                </h1>
                <h2 class="subtitle">
                  Find your course
                </h2>
              </div>
            </div>
          </section>
        </div>

          <div className="course-list" class = "tile is-ancestor has-navbar-fixed-top">
              {courses}
          </div> 
      </div>
    );
  }
}



export default CourseList;