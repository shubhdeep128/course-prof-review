import React , {Component} from 'react';
import styles from './form.css';
import API from '../../../utils/API';

class CourseForm extends Component {
  state = {
    Relevant_tags : []
  }
  addTag(e){
    e.preventDefault();
    var tag = this.refs.tags.value;
    if (tag=="")
    {
      alert("Tags should not be empty!")
    }
    else{
    var tags = this.state.Relevant_tags;
    tags.push  (tag)
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
    var tags = this.state.Relevant_tags;
    if(tags.length < 3)
    {
      alert("Minimum 3 tags required!")
    }
    else
    {
    API.post('/api/course/add', {
        Name : Name,
        Description: Description,
        Current_Professer: "",
        Reviews: [],
        Relevant_tags: this.state.Relevant_tags,
        Average_grade: 7
      }).then(function (response) {
        alert("Course added successfully!");
        
      }).catch(function (error) {
        console.log(error);
      });
  }
}
  
  render(){
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    var tags = this.state.Relevant_tags;
    let that = this;
    tags = tags.map(function(tag,key){
      return(
      <div>{tag}
      <button onClick = {() =>that.deleteTag(key)}>
               Delete
               </button>
      </div>
      )
    }
    )
    return(
      <div className="form">
        <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="name" required/> 
        <textarea type="text" placeholder="Description" ref="desc" required/>
        <input type="text" placeholder="Relevant Tags" ref="tags" />
        <button onClick = {this.addTag}>Add Tag</button>
    <div>{tags}</div>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}



export default CourseForm;