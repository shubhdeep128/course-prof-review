import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API from '../../utils/API'
import OuterContiner from '../OuterContainer/OuterContainer'
import styles from './Admin.css'
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
            <div >
                <OuterContiner/>
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
