import React , {Component} from 'react';
import {card} from 'bulma';

class EachCourse extends Component {
  
  render(){
    
    return(
 
      <div>
      <div class="card">
  <header class="card-header">
    <p class="card-header-title">
    {this.props.name}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
    {this.props.desc}
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">{this.props.Relevant_tags}</a>

  </footer>
</div>
      </div>
      // <div className="course-container">
      //     <h1> {this.props.name} </h1>
      //     <h1>{this.props.course_id}</h1>
      //     <div className="grading-box">
      //         {this.props.grading}
      //     </div>
      // </div> 
    );
  }
}



export default EachCourse;