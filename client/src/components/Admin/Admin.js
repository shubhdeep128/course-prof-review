import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API from '../../utils/API'
import styles from './Admin.css'
export default class Admin extends Component {
    
    render() {
        if(this.props.current_user.Roles != 'Admin'){
            console.log(this.props.current_user.Roles)
            return(
                <div class = "container has-text-centered">
                    <p class = "title">Unauthorized</p>
                    <p class = "subtitle">Log in as an Admin to Continue</p>
                </div>
            )
        }
        return (
            <div >
                <div class = "columns is-centered is-mobile">
                    <div class = "column is-11">
                    <div class = "admin-box box">
                        <div class = "admin-title">Admin</div>
                    </div>
                    </div>
                </div>
                <div class = "columns is-mobile">
                    <div class = "column is-half has-text-centered">
                        <a href = "admin/courses" class = "button is-large is-rounded admin-btn" id = "course-button">Courses</a>
                    </div>
                    
                    <div class = "column is-half has-text-centered">
                        <a href = "admin/profs" class = "button is-large is-rounded admin-btn" id = "course-button">Professors</a>
                    </div>
                </div>
            </div>
        )
    }
}
