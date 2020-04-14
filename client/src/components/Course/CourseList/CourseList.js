import React , {Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../../utils/API.js'
import Pagination from './Pagination.js'
import styles from "./CourseList.css"
class CourseList extends Component {
    state={
        loadStatus:false,
        courses: [],
        currentPage: 1,
        coursesPerPage: 3,
        error:false,
        search: ''
      }
      handleChange(event){
        this.setState({search : event.target.value});
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
    this.handleChange = this.handleChange.bind(this);
    const lastindex = this.state.currentPage*this.state.coursesPerPage;
    const firstIndex = lastindex - this.state.coursesPerPage;
    var courses = this.state.courses;
    var string = '/course/'
    let filteredCourses = courses.filter(
      (course) => {
        return course.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    const currentCourses = filteredCourses.slice(firstIndex,lastindex);
    
    if(this.state.loadStatus===true){
      courses = currentCourses.map(function(course){
        return(
          <div class = "column is-one-third">
            <EachCourse name={course.Name} rating={course.Rating} average_grade = {course.Average_grade} course_id={string + course._id}/>
          </div> 
        )
      }.bind(this));
    }
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
    
    return(
      <div>
        <div>
          <div class = "columns is-centered is-mobile">
            <div class = "column is-11">
              <div class = "head-box box">
                <div class = "head-title">Courses</div>
              </div>
              </div>
          </div>
          <div class = "container has-text-centered">
            <div class="control has-icons-left has-icons-right">
              <input class = "input is-large is-rounded" type = "text" placeholder = "Search By Name" onChange = {this.handleChange}/>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <img src="search-36dp.svg"/>
              </span>
            </div>
          </div>
          <div class = "container">
            <div class = "columns is-centered is-mobile">
              {courses}
            </div>
          </div>
          <footer class = "footer">
            <Pagination coursesPerPage = {this.state.coursesPerPage} totalCourses = {this.state.courses.length} currentPage = {this.state.currentPage} paginate = {paginate}/>
          </footer>
          
        </div>
      </div>
    );
  }
}



export default CourseList;