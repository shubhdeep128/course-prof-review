import React , {Component} from 'react';
import API from '../../../utils/API';
import {Redirect} from 'react-router-dom';

class AddProf extends Component {
  state = {
    Relevant_tags : []
  }
  addTag(e){
    e.preventDefault();
    var tag = this.refs.tags.value;
    var tags = this.state.Relevant_tags;
    if (tag=="")
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
    var self = this;
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
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    var tags = this.state.Relevant_tags;
    let that = this;
    tags = tags.map(function(tag,key){
      return(
      <div>{tag}
      <button onClick = {() =>that.deleteTag(key)} type = "button">
               Delete
               </button>
      </div>
      )
    }
    )
    this.handleSubmit = this.handleSubmit.bind(this)
    return(
      <div className="form">
        <form onSubmit={this.handleSubmit}>
        <div>
        <input type="text" placeholder="Name" ref="name" required/>
        </div>
        <div> 
        <textarea type="text" placeholder="Description" ref="desc" required/>
        </div>
        <div>
          <input type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
          <button onClick = {this.addTag} type = "button">Add Tag</button>
          <div> {tags} </div>
        </div>
        <div>
        <input type="submit" value="Submit" />
        </div>
      </form>
      </div>
    );
  }
}



export default AddProf;