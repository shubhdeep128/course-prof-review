import React,{ Component } from "react";


class EachProf extends Component {
    
    render(){
        return(
            <div class = "box">
                <div> {this.props.name} </div>
                <div> {this.props.desc} </div>
                <div> {this.props.tags} </div>
                <div>
                    <a href={this.props.profid}>Update</a>
                    <button onClick = {this.props.onClick}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}
export default EachProf;