import React,{Component} from 'react';
import './OuterContainer.css';
import API from '../../utils/API.js'

class OuterContainer extends Component {
    state = {
        current_user: {"status":"Unauthorized"},
        error: false,
        loadStatus: false
    }
    componentDidMount(){
        API.get("/api/current_user")
        .then(response => {
            this.setState({error:false,loadStatus:true, current_user: response.data});
            console.log(response.data);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
        }
    render(){
        document.addEventListener('DOMContentLoaded', () => {

            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {
              // Add a click event on each of them
                $navbarBurgers.forEach( el => {
                    el.addEventListener('click', () => {
                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                    });
                });
            }
        });
        if(this.state.current_user === null){
            this.state.current_user = {"Roles": "Unauthorized"}
        }

        const AdminButton = ()=>{
        if(this.state.current_user.Roles === 'Admin'){
            return(
                <div>
                    <hr class="navbar-divider"/>
                    <a class="navbar-item" href = "/admin">
                        <span>Admin</span>
                    </a>
                </div>
            )
        }
        else{
            return
        }
        }
        const LoginButton = ()=>{
            if(this.state.current_user.Roles === "Unauthorized"){
                console.log("here")
                return(
                <a class="button is-black is-rounded" href = "/auth/google">
                    <span> <strong>Log in</strong></span>
                </a>
                )
            }
            else{
            return(
                <a class="button is-black is-rounded" href = "/api/logout">
                    <span> <strong>Log Out</strong></span>
                </a>
            )
            }
        }
        console.log(this.state.current_user)
        return(
            <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <span class = "is-size-4 has-text-weight-bold has-text-black">CourseReview</span>
                    </a>


                    <a role="button" class="navbar-burger" data-target="navbarWeb" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
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
                        {AdminButton()}
                        </div>
                    </div>
                    </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        {LoginButton()}
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