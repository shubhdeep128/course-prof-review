import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        
        return (
            <div className = "container has-text-centered">
                <p className ="title has-text-danger is-size-1">404</p>
                <p className ="subtitle">Page Not Found</p>
            </div>
        )
    }
}
