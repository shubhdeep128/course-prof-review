import React, { Component } from 'react'
import ReactLoading from 'react-loading'
export default class Loading extends Component {
    render() {
        return (
                <ReactLoading type = {this.props.type} color = {"black"}/>  
        )
    }
}
