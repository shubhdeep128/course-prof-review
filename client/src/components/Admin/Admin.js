import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API from '../../utils/API'
export default class Admin extends Component {
    state = {
        current_user: {},
        error: false,
        loadStatus: false
    }
    componentDidMount(){
        API.get("/api/current_user")
        .then(response => {
            this.setState({error:false,loadStatus:true, current_user: response.data});
            // console.log(response.data);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
    }
    render() {
        if(this.state.current_user.Roles != 'Admin'){
            console.log(this.state.current_user.Roles)
            return(
                <div>
                    Unathorized
                </div>
            )
        }
        return (
            <div class = "container">
                <h1 class = "is-size-1">This is admin page</h1>
                <Link to = "admin/courses"><button class = "button" id = "course-button">Courses</button></Link>
                <Link to = "admin/profs"><button class = "button" id = "course-button">Professors</button></Link><br/>
            </div>
        )
    }
}
