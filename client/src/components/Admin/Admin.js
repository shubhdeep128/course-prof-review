import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class Admin extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            loggedIn
        }
    }
    render() {
        if(this.state.loggedIn === false){
            return <Redirect to = "/admin/login"></Redirect>
        }
        return (
            <div class = "container">
                <h1 class = "is-size-1">This is admin page</h1>
                <Link to = "admin/courses"><button class = "button" id = "course-button">Courses</button></Link>
                <Link to = "admin/profs"><button class = "button" id = "course-button">Professors</button></Link><br/>
                <Link to= "admin/logout"><button class = "button" id = "course-button">Logout</button></Link>
            </div>
        )
    }
}
