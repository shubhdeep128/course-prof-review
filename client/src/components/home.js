import React , {Component} from 'react';
import OuterContainer from'./OuterContainer/OuterContainer.js'
import styles from './home.css'
class Home extends Component {
  render(){
    return(
      <div>
            <OuterContainer />
            {/* <section class="hero is-fullheight-with-navbar">
              <div class="hero-body">
                <div class="columns web-title has-text-centered">
                  <div class = "column is-full">
                    Welcome to <br/>
                    <span>CourseReview</span>
                  </div>
                </div>
              </div>
            </section> */}
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