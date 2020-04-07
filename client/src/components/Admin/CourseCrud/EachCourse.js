import React,{ Component } from "react";


class EachCourse extends Component {
    
    render(){
        return(
            <div class = "box">
                <div> {this.props.name} </div>
                <div> {this.props.desc} </div>
                <div> {this.props.prof} </div>
                <div> {this.props.tags} </div>
                <div> {this.props.grade} </div>
                <div> {this.props.rating} </div>
                <div>
                    <a href={this.props.course_id}>
                        Update
                    </a>
                    <button onClick = {this.props.onClick}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}
export default EachCourse;