import React,{ Component } from "react";


class EachProf extends Component {
    
    render(){
        const tags = this.props.tags.map(function(tag,i){
            return(
                <span key = {i} className = "tag is-rounded is-light is-medium is-success">{tag}</span>
            )
        })
        return(
            // <div className = "box">
            //     <div> {this.props.name} </div>
            //     <div> {this.props.desc} </div>
            //     <div> {this.props.tags} </div>
            //     <div>
            //         <a className = "button is-black is-rounded" href={this.props.profid}>
            //             Update
            //         </a>
            //         <button className = "button is-danger is-black is-rounded" onClick = {this.props.onClick}>
            //             Delete
            //         </button>
            //     </div>
            // </div>
            <div className = "container">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title has-text-weight-bold is-size-3 has-text-black">
                        {this.props.name}
                        </p>
                        <span className="icon">
                            <img src = "../expand_more.svg" alt = ""></img>
                        </span>
                    </header>
                    <div className="card-content">
                        <div className="content">
                        <span className = " is-size-5 has-text-weight-bold">Description - </span>{this.props.desc}                       
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Tags - </span>{tags}
                        <br/>
                        <span className = " is-size-5 has-text-weight-bold">Rating - </span>{this.props.rating}                       
                        <br/>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a href={this.props.profid} className="button is-large is-white has-text-link card-footer-item has-text-weight-semibold">Update</a>
                        <button onClick = {this.props.onClick} className="button is-large is-white card-footer-item has-text-danger has-text-weight-semibold">Delete</button>
                    </footer>
                    </div>
                </div>
        )
    }
}
export default EachProf;