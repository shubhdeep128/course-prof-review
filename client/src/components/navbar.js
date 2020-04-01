import React , {Component} from 'react'
import {Link} from 'react-router-dom';

class Navbar extends Component{
  render(){
    return(
      <nav class="navbar navbar-expand-sm bg-white navbar-dark fixed-top">
      <Link to={{pathname:'/'}}><li class="navbar-brand">Admin Page</li></Link>
      </nav>
    )
  }
}


export default Navbar