import React,{Component} from 'react';
import API from '../../../utils/API.js';

class UpdateForm extends Component {
    state  = {
        loadStatus : false,
        profs : [],
        Relevant_tags : [],
        error : false
    }
    handleSubmit(e){
        e.preventDefault();
        const { match: { params } } = this.props;
        var Name = this.refs.name.value;
        var Description = this.refs.desc.value;
        var Rating = this.refs.rating.value;
        var revCount = this.refs.revCount.value
        if(this.state.Relevant_tags.length < 3)
        {
            alert("Minimum 3 tags required!")
        }
        else
        {
        API.patch(`/api/prof/${params.profid}`, {
            Name : Name,
            Description: Description,
            Rating: Rating,
            Relevant_tags: this.state.Relevant_tags,
            revCount: revCount
          }).then(function (response) {
            alert("Professor Updated successfully!");
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }
      componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        API.get(`/api/prof/${params.profid}`).then((response) => {
          this.setState({error:false, profs:response.data.prof, loadStatus:true,Relevant_tags:response.data.prof.Relevant_tags});
          console.log(this.state.profs);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
        
      }

      addTag(e){
        e.preventDefault();
        var tag = this.refs.tags.value;
        var tags = this.state.Relevant_tags;
        if (tag === "")
        {
           alert("Tags should not be empty!")
        }
        else
        {
        tags.push(tag)
        this.setState({Relevant_tags : tags})
        console.log(this.state.Relevant_tags);
        this.refs.tags.value = '';
        }
      }
      deleteTag = (key) => {
        var tags = this.state.Relevant_tags;
        tags.splice(key,1);
        this.setState({Relevant_tags : tags})
      }
      

    render(){
      if(this.props.current_user.Roles !== 'Admin'){
        console.log(this.props.current_user.Roles)
        return(
            <div className = "container has-text-centered">
                <p className = "title">Unauthorized</p>
                <p className = "subtitle">Log in as an Admin to Continue</p>
            </div>
        )
    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        var tags = this.state.Relevant_tags;
        let that = this;
        tags = tags.map(function(tag,key){
          console.log(tag,key)
          return(
            <span className="tag is-medium is-success">
            {tag}
            <button type = "button" onClick = {() =>that.deleteTag(key)} className="delete is-small"></button>
          </span>
          )
        }
        )
        return(
            <div>
      <div className = "form box">
                <form className = "form">
                  <span className = "is-size-1 has-text-weight-bold has-text-black">Update Professor</span><br/><br/>
                    <div className = "field">
                      <label className = "label">Name</label>
                      <div className="control">
                      <input className = "input" defaultValue = {this.state.profs.Name} placeholder = "Name" ref = "name" required/>
                      </div>
                    </div>


                    <div className = "field">
                      <label className = "label">Description</label>
                      <div className = "control">
                        <textarea className = "textarea" defaultValue = {this.state.profs.Description} placeholder = "Description" ref= "desc" required/>
                      </div>
                    </div>

                    <div className = "field">
                      <label className = "label">Relevant Tags</label>
                      <div className = "control">
                        <input className = "input" type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                        <br/><br/>
                        <button className = "button is-link is-rounded" onClick = {this.addTag}>Add Tags</button>
                      </div>
                    </div>

                    <div className = "field">
                    
                    <br/><br/>
                    <label className = "label"> Existing Tags:{tags} </label>
                    </div>

                    <div className = "field">
                    <label className = "label">Rating</label>
                      <div className = "control">
                        <input className = "input" defaultValue = {this.state.profs.Rating} placeholder = "Rating" ref = "rating" required/>
                      </div>
                    </div>
                    <div className = "field">
                    <label className = "label">Review Count</label>
                      <div className = "control">
                        <input className = "input" defaultValue = {this.state.profs.revCount} placeholder = "revCount" ref = "revCount" required/>
                      </div>
                    </div>

                </form>
                <div className = "form-btn"><input onClick = {this.handleSubmit} className = "button is-large is-success is-rounded" type = "submit" value = "Update" /></div>
            </div>
            </div>
        )
    }
}

export default UpdateForm;