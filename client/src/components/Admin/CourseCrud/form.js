import React , {Component} from 'react';
import styles from './form.css';
import API from '../../../utils/API';

class CourseForm extends Component {
  state = {
    Relevant_tags : [],
    Professers : [],
    currentprof : ""
  }
  componentDidMount(){
    this.setState(this.props.location.state)
    API.get('/api/prof/').then((response) => {
      this.setState({Professers : response.data})
      console.log(this.state.Professers._id)

    }).catch(function(error){
      console.log(error)
    })
  }
  handleChange(event){
    this.setState({currentprof : event.target.value});
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
    console.log(this.state.currentprof)
    API.post('/api/course/add', {
        Name : Name,
        Description: Description,
        Current_Professer: this.state.currentprof,
        Reviews: [],
        Relevant_tags: this.state.Relevant_tags,
        Average_grade: 7
      }).then(function (response) {
        alert("Course added successfully!");
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
  }
}
  
  render(){
  const  compare = ( a, b ) => {
      if ( a.Name < b.Name ){
        return -1;
      }
      if ( a.Name > b.Name ){
        return 1;
      }
      return 0;
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleChange = this.handleChange.bind(this)
    var tags = this.state.Relevant_tags;
    let that = this;
    var Professers = this.state.Professers;
    Professers.sort(compare);
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
    Professers = Professers.map(function(professor){
      return(
      <option value = {professor._id}>{professor.Name}</option>
      )
    })
    return(
      <div className="form">
        <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="name" required/> 
        <textarea type="text" placeholder="Description" ref="desc" required/>
        <input type="text" placeholder="Relevant Tags" ref="tags" />
        <button onClick = {this.addTag}>Add Tag</button>
    <div>{tags}</div>
        <label>Current_Professer</label>
        <select value = {this.state.currentprof} onChange = {this.handleChange}>
          {Professers}
        </select>  
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}



export default CourseForm;