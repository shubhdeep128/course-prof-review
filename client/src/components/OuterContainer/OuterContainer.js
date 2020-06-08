import React,{Component} from 'react';
import './OuterContainer.css';

class OuterContainer extends Component {

    render(){
        console.log(this.props);

        document.addEventListener('DOMContentLoaded', () => {
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            if ($navbarBurgers.length > 0) {
                $navbarBurgers.forEach( el => {
                    el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                    });
                });
            }
        });

        const AdminButton = ()=>{
        if(this.props.current_user.Roles === 'Admin'){
            return(
                <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link" href = '/admin'>
                            Admin
                        </a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item" href = "/admin/courses">
                                Courses
                            </a>
                            <a className="navbar-item" href = '/admin/profs/'>
                                Professors
                            </a>
                            <a className="navbar-item" href = "/admin/dashboard">
                                Dashboard
                            </a>
                        </div>
            </div>
            )
        }
        else{
            return
        }
        }
        const LoginButton = ()=>{
            if(!this.props.loginStatus){
                return(
                <a className="button is-black is-rounded" href = "/auth/google">
                    <span> <strong>Log in</strong></span>
                </a>
                )
            }
            else{
            return(
                <a className="button is-black is-rounded" href = "/api/logout">
                    <span> <strong>Log Out</strong></span>
                </a>
            )
            }
        }
        return(
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <span className = "is-size-4 has-text-weight-bold has-text-black">CourseReview</span>
                        </a>
                        <div role="button" className="navbar-burger" data-target="navbarWeb" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </div>
                    </div>

                    <div id="navbarWeb" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href = "/course">
                                <span>Courses</span>
                            </a>
                            <a className="navbar-item" href = "/prof">
                                <span>Professors</span>
                            </a>

                            
                            {AdminButton()}
                        </div>

                        <div className="navbar-end">
                            <a className="navbar-item" href = "/about">
                                <span>About Us</span>
                            </a>
                            <div className="navbar-item">
                                <div className="buttons">
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