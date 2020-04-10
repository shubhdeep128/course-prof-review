import React , {Component} from 'react';
import styles from './form.css';
import API from '../../../utils/API'
import OuterContainer from '../../OuterContainer/OuterContainer.js';

class CourseForm extends Component {
  state = {
    Relevant_tags : [],
    Professors : [],
    currentprof : ""
  }
  componentDidMount(){
    this.setState(this.props.location.state)
    API.get('/api/prof/').then((response) => {
      this.setState({Professors : response.data})
      console.log(this.state.Professors)

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
    var name = this.refs.name.value;
    var desc = this.refs.desc.value;
    var tags = this.state.Relevant_tags;
    var prof = this.refs.prof.value;
    var rating = this.refs.rating.value;
    var average_grade = this.refs.grading.value;
    console.log(name,desc,tags,prof,rating,average_grade)
    if(tags.length < 3)
    {
      alert("Minimum 3 tags required!")
    }
    else
    {
    API.post('/api/course/add', {
        Name : name,
        Description: desc,
        Current_Professor: prof,
        Relevant_tags: tags,
        Rating: rating,
        Average_grade: average_grade

      }).then(function (response) {
        alert("Course added successfully!");
        
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
    var tags = this.state.Relevant_tags;
    let that = this;
    var Professors = this.state.Professors;
    Professors.sort(compare);
    tags = this.state.Relevant_tags.map(function(tag,key){
      return(
        <span class="tag is-medium is-success">
        {tag}
        <button type = "button" onClick = {() =>that.deleteTag(key)} class="delete is-small"></button>
      </span>
      )
    }
    )
    Professors = Professors.map(function(professor){
      return(
      <option value = {professor._id}>{professor.Name}</option>
      )
    })
    return(
      <div>
      <OuterContainer />
      <div class = "form box">
                <form class = "form">
                  <span class = "is-size-1 has-text-weight-bold has-text-black">Add Course</span><br/><br/>
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

                    <div class="field">
                      <label class="label">Current Professor</label>
                      <div class="control">
                        <div class="select">
                          <select ref = "prof">
                            {Professors}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class = "field">
                      <label class = "label">Average Grading</label>
                      <div class = "control">
                        <input type = "text" class = "input" placeholder = "Average Grading" ref = "grading" required/>
                      </div>
                    </div>

                    <div class = "field">
                    <label class = "label">Rating</label>
                      <div class = "control">
                        <input type = "number" class = "input" placeholder = "Rating" ref = "rating" required/>
                      </div>
                    </div>
                    <br/><br/>
                    <div class = "form-btn"><input onClick = {this.handleSubmit} class = "button is-large is-success is-rounded" type = "submit" value = "Add" /></div>
                </form>
                
            </div>
      </div>
    );
  }
}



export default CourseForm;