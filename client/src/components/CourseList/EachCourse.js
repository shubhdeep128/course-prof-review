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
          <a href = {this.props.course_id}>See Details</a>
        </footer>
      </div>
    </div>

    );
  }
}



export default EachCourse;