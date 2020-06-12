import React,{ Component } from "react";

class EachCourse extends Component {
    
    render(){
        const tags = this.props.tags.map(function(tag,i){
            return(
                <span key= {i} className = "tag is-rounded is-light is-medium is-success">{tag}</span>
            )
        })
        return(
            <div className = "container">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title has-text-weight-bold is-size-3 has-text-black">
                        {this.props.name}
                        </p>
                        <span className="icon">
                            <img src = "../expand_more.svg" alt = "" ></img>
                        </span>
                    </header>
                    <div className="card-content">
                        <div className="content">
                        <span className = " is-size-5 has-text-weight-bold">Description - </span>{this.props.desc}
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Current Prof - </span>{this.props.prof}
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Average Grade - </span>{this.props.grade}
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Average Rating - </span>{this.props.rating}
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Tags - </span>{tags}
                        <br/>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a href={this.props.course_id} className="button is-white has-text-link is-large card-footer-item has-text-weight-semibold" id = {this.props.name.split(" ")[0] +"-update"}>Update</a>
                        <button onClick = {this.props.onClick} className="button is-white is-large card-footer-item has-text-danger has-text-weight-semibold" id = {this.props.name.split(" ")[0] + "-delete"}>Delete</button>
                    </footer>
                    </div>
                </div>
        )
    }
}
export default EachCourse;