import React, { Component } from 'react'
import API from '../utils/API'
export default class Test extends Component {
    componentDidMount(){
        // this.setState(this.props.location.state)
        API.get('/api/course').then((response) => {
          this.setState({error:false, courses:response.data, loadStatus:true});
          console.log(response.data);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA",error);
          console.log(error);
          window.location = '/'
        });
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
