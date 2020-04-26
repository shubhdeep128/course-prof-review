import React , {Component} from 'react';
import './EachProf.css'
class EachProf extends Component {
  
  render(){
    console.log(this.props);

    return(

 
    <div>
      <div className = "box prof-box">
        <div className = "prof-title" id = "prof-title">
          {this.props.name}
        </div>
        <nav className = "level">
          <div className = "level-left">
            <div className = "level-item">
              <div className = "prof-rating-circle">
                <div className = "prof-circle-text"> {Number(this.props.rating).toFixed(1)}</div>
              </div>
            </div>
          </div>
          <div className = "level-right">
            <div className = "level-item has-text-weight-bold">
              <span className = "icon is-large">
              <a className = "has-text-black"href = {this.props.prof_id}>
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



export default EachProf;