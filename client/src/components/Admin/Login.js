import React, { Component } from 'react'
import creds from './creds'
import { Redirect } from 'react-router-dom'
export default class Login extends Component {
    constructor(props){
        super(props)
        let loggedIn = false
        this.state = {
            username: '',
            password: '',
            loggedIn
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm(e){
        e.preventDefault()
        const {username,password} = this.state
        if (creds.hasOwnProperty(username) && creds[username] === password) {
            localStorage.setItem("token","df4r98dum92et8754rew4250u")
            this.setState({
                loggedIn:true
            })
        }
    }
    
    render() {
        if(this.state.loggedIn){
            return <Redirect to = "/admin"></Redirect>
        }
        console.log(creds)
        return (
            <div class = "container">
                <h1>Login</h1>
                <form onSubmit = {this.submitForm}>
                    <input type="text" id = "username" placeholder = "username" name = "username" value = {this.state.username} onChange = {this.onChange} />
                    <br/>
                    <input type="password" id = "password" placeholder = "password" name = "password" value = {this.state.usernpasswordame} onChange = {this.onChange} />
                    <br/>
                    <button class = "button" type="submit" data-cy-login-button >Log In</button>
                    
                </form>
            </div>
        )
    }
}
