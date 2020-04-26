import React, { Component } from 'react'
import './Admin.css'
export default class Admin extends Component {
    
    render() {
        if(this.props.current_user.Roles !== 'Admin'){
            console.log(this.props.current_user.Roles)
            return(
                <div className = "container has-text-centered">
                    <p className = "title">Unauthorized</p>
                    <p className = "subtitle">Log in as an Admin to Continue</p>
                </div>
            )
        }
        return (
            <div >
                <div className = "columns is-centered is-mobile">
                    <div className = "column is-11">
                    <div className = "admin-box box">
                        <div className = "admin-title">Admin</div>
                    </div>
                    </div>
                </div>
                <div className = "columns is-mobile">
                    <div className = "column is-half has-text-centered">
                        <a href = "admin/courses" className = "button is-large is-rounded admin-btn" id = "course-button">Courses</a>
                    </div>
                    
                    <div className = "column is-half has-text-centered">
                        <a href = "admin/profs" className = "button is-large is-rounded admin-btn" id = "course-button">Professors</a>
                    </div>
                </div>
            </div>
        )
    }
}
