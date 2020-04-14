import React , {Component} from 'react';
import styles from './home.css'
class Home extends Component {
  render(){
    return(
      <div>
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="web-title wow fadeInUp">
              Welcome to <br/>
              <span>CourseReview</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;