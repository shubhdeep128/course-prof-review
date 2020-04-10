import React , {Component} from 'react';
import API from '../../../utils/API';
import {Redirect} from 'react-router-dom';
import OuterContainer from '../../OuterContainer/OuterContainer';

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
    tags = this.state.Relevant_tags.map(function(tag,key){
      return(
        <span class="tag is-medium is-success">
        {tag}
        <button type = "button" onClick = {() =>that.deleteTag(key)} class="delete is-small"></button>
      </span>
      )
    }
    )
    this.handleSubmit = this.handleSubmit.bind(this)
    return(
      <div>
        <OuterContainer/>
        {/* <form class = "form" onSubmit={this.handleSubmit}>
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
      </form> */}
      <div class = "form box">
                <form class = "form">
                  <span class = "is-size-1 has-text-weight-bold has-text-black">Add Professor</span><br/><br/>
                    <div class = "field">
                      <label class = "label">Name</label>
                      <div class="control">
                      <input class = "input" placeholder = "Name" ref = "name" required/>
                      </div>
                    </div>


                    <div class = "field">
                      <label class = "label">Description</label>
                      <div class = "control">
                        <textarea class = "textarea" placeholder = "Description" ref= "desc" required/>
                      </div>
                    </div>

                    <div class = "field">
                      <label class = "label">Relevant Tags</label>
                      <div class = "control">
                        <input class = "input" type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                      </div>
                    </div>

                    <button class = "button is-link is-rounded" onClick = {this.addTag}>Add Tags</button>
                    <br/><br/>
                    <label class = "label"> Existing Tags:{tags} </label>
                </form>
                <div class = "form-btn"><input onClick = {this.handleSubmit} class = "button is-large is-success is-rounded" type = "submit" value = "Add" /></div>
            </div>
      </div>
    );
  }
}



export default AddProf;