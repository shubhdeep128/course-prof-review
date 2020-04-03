import React,{Component} from 'react';
import './OuterContainer.css';

class OuterContainer extends Component {
    render(){
        return(
            <div>
            <nav class="navbar has-shadow is-light" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                    <img src="logoDummy.png" width="112" height="28"/>
                    </a>

                    <div id="navbarBurger" class="navbar-burger" data-target="navbarWeb" >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarWeb" class="navbar-menu">
                    <div class="navbar-start">

                    <a class="navbar-item" href = "/course">
                        <span>Courses</span>
                    </a>
                    <a class="navbar-item" href = "/">
                        <span>Professors</span>
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        More
                        </a>

                        <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider"/>
                        <a class="navbar-item">
                            Admin
                        </a>
                        </div>
                    </div>
                    </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button is-primary" href = "/auth/google">
                           <span> <strong>Log in</strong></span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            </div>
            
        )
    }
}
export default OuterContainer;