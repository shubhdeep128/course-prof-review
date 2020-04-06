import React , {Component} from 'react';
import styles from './EachCourse.css'
import {card} from 'bulma';

class EachCourse extends Component {
  
  render(){
    console.log(this.props);
    return(

 
    <div>
      <div class = "box course-box">
        <div class = "course-title">{this.props.name}</div>
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