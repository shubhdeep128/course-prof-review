import React , {Component} from 'react';
import API from '../../../utils/API';

class AddProf extends Component {
  state = {
    Relevant_tags : []
  }
  addTag(e){
    e.preventDefault();
    var tag = this.refs.tags.value;
    var tags = this.state.Relevant_tags;
    if (tag === "")
    {
      alert("Tags should not be empty!")
    }
    else{
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
  
  handleSubmit(e){
    e.preventDefault();
    var Name = this.refs.name.value;
    var Description = this.refs.desc.value;
    if(this.state.Relevant_tags.length < 3)
    {
      alert("Minimum 3 tags required!")
    }
    else
    {
    API.post('/api/prof/add', {
        Name : Name,
        Description: Description,
        Relevant_tags: this.state.Relevant_tags,
      }).then(function (response) {
        alert("Professor added successfully!");
        this.props.history.push('/admin/courses')
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }
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
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    var tags = this.state.Relevant_tags;
    let that = this;
    tags = this.state.Relevant_tags.map(function(tag,key){
      return(
        <span className="tag is-medium is-success">
        {tag}
        <button type = "button" onClick = {() =>that.deleteTag(key)} className="delete is-small"></button>
      </span>
      )
    }
    )
    this.handleSubmit = this.handleSubmit.bind(this)
    return(
      <div>
      <div className = "form box">
                <form className = "form">
                  <span className = "is-size-1 has-text-weight-bold has-text-black">Add Professor</span><br/><br/>
                    <div className = "field">
                      <label className = "label">Name</label>
                      <div className="control">
                      <input className = "input" placeholder = "Name" ref = "name" required/>
                      </div>
                    </div>


                    <div className = "field">
                      <label className = "label">Description</label>
                      <div className = "control">
                        <textarea className = "textarea" placeholder = "Description" ref= "desc" required/>
                      </div>
                    </div>

                    <div className = "field">
                      <label className = "label">Relevant Tags</label>
                      <div className = "control">
                        <input className = "input" type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                      </div>
                    </div>

                    <button className = "button is-link is-rounded" onClick = {this.addTag}>Add Tags</button>
                    <br/><br/>
                    <label className = "label"> Existing Tags:{tags} </label>

                    <div className = "field">
                    <label className = "label">Rating</label>
                      <div className = "control">
                        <input type = "number" className = "input" placeholder = "Rating" ref = "rating" required/>
                      </div>
                    </div>
                </form>
                <div className = "form-btn"><input onClick = {this.handleSubmit} className = "button is-large is-success is-rounded" type = "submit" value = "Add" /></div>
            </div>
      </div>
    );
  }
}



export default AddProf;