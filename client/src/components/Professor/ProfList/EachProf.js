import React , {Component} from 'react';
import { Redirect } from 'react-router-dom';
import styles from './EachProf.css'
class EachProf extends Component {
  
  render(){
    console.log(this.props);
    var string = "prof/"+this.props.prof_id;

    return(

 
    <div>
      <div class = "box prof-box">
        <div class = "prof-title" id = "prof-title">
          {this.props.name}
        </div>
        <nav class = "level">
          <div class = "level-left">
            <div class = "level-item">
              <div class = "prof-rating-circle">
                <div class = "prof-circle-text"> {this.props.rating}</div>
              </div>
            </div>
          </div>
          <div class = "level-right">
            <div class = "level-item has-text-weight-bold">
              <span class = "icon is-large">
                <a class = "has-text-black"href = {this.props.prof_id}>
                  <img src = "arrow_forward.svg"></img>
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



export default EachProf;