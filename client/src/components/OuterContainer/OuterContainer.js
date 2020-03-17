import React,{Component} from 'react';
import './OuterContainer.css';
import {Link} from 'react-router-dom';


class OuterContainer extends Component {
    render(){
        return(
            
            <div className='topbar'>
             <div class="topnav">
             
              <Link to="/">Home </Link>
              <Link to="/course">Course List </Link>
              <Link to="/course/add">Course Form</Link>
            
            </div> 
            </div>
            
        )
    }
}
export default OuterContainer;