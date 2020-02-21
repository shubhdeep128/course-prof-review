import React , {Component} from 'react';


class EachCourse extends Component {
  
  render(){
    
    return(
      <div className="course-container">
          <h1> {this.props.name} </h1>
          <h1>{this.props.course_id}</h1>
          <div className="grading-box">
              {this.props.grading}
          </div>
      </div> 
    );
  }
}



export default EachCourse;