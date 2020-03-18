import React , {Component} from 'react';
import OuterContainer from'./OuterContainer/OuterContainer.js'
class Home extends Component {
  render(){
    return(
      <div>
            <OuterContainer />
            <section class="hero is-dark is-fullheight-with-navbar">
              <div class="hero-body">
                <div class="container">
                  <p class="title is-light">
                    Fullheight hero with navbar
                  </p>
                </div>
              </div>
            </section>
      </div>
    );
  }
}

export default Home;