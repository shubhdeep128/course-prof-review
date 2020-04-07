import React , {Component} from 'react';
import styles from './EachCourse.css'
import {card} from 'bulma';
import { Redirect } from 'react-router-dom';

class EachCourse extends Component {
  
  render(){
    console.log(this.props);
    var string = "course/"+this.props.course_id;

    return(

 
    <div>
      <div class = "box course-box">
        <div class = "course-title" id = "course-title"><a href = {this.props.course_id}>
          {this.props.name}
          </a>
          </div>
        <nav class = "level">
          <div class = "level-left">
            <div class = "level-item">
              <div class = "rating-circle">
                <div class = "circle-text"> {this.props.rating}</div>
              </div>
            </div>
          </div>
          <div class = "level-right">
            <div class = "level-item has-text-weight-bold">
              {this.props.average_grade}
            </div>
          </div>
        </nav>
        
      </div>
      
    </div>

    );
  }
}



export default EachCourse;