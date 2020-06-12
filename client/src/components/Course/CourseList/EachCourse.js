import React , {Component} from 'react';
import './EachCourse.css'

class EachCourse extends Component {
  
  render(){
    console.log(this.props);

    return(

 
    <div>
      <div className = "box course-box">
        <div className = "course-title" id = "course-title">
          {this.props.name}
        </div>
        <nav className = "level">
          <div className = "level-left">
            <div className = "level-item">
              <div className = "rating-circle">
                <div className = "circle-text"> {Number(this.props.rating).toFixed(1)}</div>
              </div>
            </div>
          </div>
          <div className = "level-right">
            <div className = "level-item has-text-weight-bold">
              <span className = "icon is-large">
                <a className = "has-text-black"href = {this.props.course_id} id = "course-details">
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </span>
            </div>
          </div>
        </nav>
        
      </div>
      
    </div>

    );
  }
}



export default EachCourse;