import React,{ Component } from "react";


class EachProf extends Component {
    
    render(){
        const tags = this.props.tags.map(function(tag){
            return(
                <span class = "tag is-rounded is-light is-medium is-success">{tag}</span>
            )
        })
        return(
            // <div class = "box">
            //     <div> {this.props.name} </div>
            //     <div> {this.props.desc} </div>
            //     <div> {this.props.tags} </div>
            //     <div>
            //         <a class = "button is-black is-rounded" href={this.props.profid}>
            //             Update
            //         </a>
            //         <button class = "button is-danger is-black is-rounded" onClick = {this.props.onClick}>
            //             Delete
            //         </button>
            //     </div>
            // </div>
            <div class = "container">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title has-text-weight-bold is-size-3 has-text-black">
                        {this.props.name}
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <img src = "../expand_more.svg"></img>
                        </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                        <span class = " is-size-5 has-text-weight-bold">Description - </span>{this.props.desc}                       
                        <br/>
                        <span class = " is-size-5 has-text-weight-bold">Tags - </span>{tags}
                        <br/>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href={this.props.profid} class="card-footer-item has-text-weight-semibold">Update</a>
                        <a onClick = {this.props.onClick} class="card-footer-item has-text-danger has-text-weight-semibold">Delete</a>
                    </footer>
                    </div>
                </div>
        )
    }
}
export default EachProf;