import React , {Component} from 'react';
import EachCourse from './EachCourse.js';
import API from '../../../utils/API.js'
import Pagination from './Pagination.js'
import WOW from 'wowjs'
import "./CourseList.css"

class CourseList extends Component {
    constructor(props){
      super(props)
      new WOW.WOW().init()
    }
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
          console.log("ERROR LOADING DATA",error);
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
      courses = currentCourses.map(function(course,i){
        return(
          <div className = "column is-one-third" key = {i}>
            <EachCourse name={course.Name} rating={course.Rating} average_grade = {course.Average_grade} course_id={string + course._id}/>
          </div> 
        )
      });
    }
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
    
    return(
        <div>
          <div className = "columns is-centered is-mobile">
            <div className = "column is-11 wow fadeIn">
              <div className = "head-box box">
                <div className = "head-title">Courses</div>
              </div>
              </div>
          </div>
          <div className = "container has-text-centered wow fadeIn">
            <div className="control has-icons-left has-icons-right">
              <input className = "input is-large is-rounded" type = "text" placeholder = "Search By Name" onChange = {this.handleChange}/>
              <span className="icon is-small is-right">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div className = "container wow fadeInUp">
            <div className = "columns is-centered is-mobile">
              {courses}
            </div>
          </div>
          <footer className = "footer">
            <Pagination coursesPerPage = {this.state.coursesPerPage} totalCourses = {this.state.courses.length} currentPage = {this.state.currentPage} paginate = {paginate}/>
          </footer>
          
        </div>
    );
  }
}



export default CourseList;