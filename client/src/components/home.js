import React , {Component} from 'react';
import OuterContainer from './OuterContainer/OuterContainer.js'

class Home extends Component {
  render(){
    return(
            <div>
            <OuterContainer />
            <div className="land-desc col-lg-6 col-md-7">
              <a href="/auth/google">Click here</a> 
            </div>
            </div>
        
    );
  }
}

export default Home;