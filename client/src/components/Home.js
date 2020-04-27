import React , {Component} from 'react';
import './home.css'
import WOW from 'wowjs'
class Home extends Component {
  constructor(props){
    super(props)
    new WOW.WOW().init();
  }
  render(){
    return(
      <div className = "wow fadeIn">
        <div className="hero-body ">
          <div className="container has-text-centered">
            <p className="web-title">
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