import React , {Component} from 'react';
import './form.css';
import API from '../../../utils/API'

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
    if (tag === "")
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

    if(this.props.current_user.Roles !== 'Admin'){
      console.log(this.props.current_user.Roles)
      return(
          <div className = "container has-text-centered">
              <p className = "title">Unauthorized</p>
              <p className = "subtitle">Log in as an Admin to Continue</p>
          </div>
      )
  }
  
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
        <span className="tag is-medium is-success">
        {tag}
        <button type = "button" onClick = {() =>that.deleteTag(key)} className="delete is-small"></button>
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
      <div className = "form box">
                <form className = "form">
                  <span className = "is-size-1 has-text-weight-bold has-text-black">Add Course</span><br/><br/>
                    <div className = "field">
                      <label className = "label">Name</label>
                      <div className="control">
                      <input className = "input" placeholder = "Name" ref = "name" id = "name" required/>
                      </div>
                    </div>


                    <div className = "field">
                      <label className = "label">Description</label>
                      <div className = "control">
                        <textarea className = "textarea" placeholder = "Description" ref= "desc" id = "desc" required/>
                      </div>
                    </div>

                    <div className = "field">
                      <label className = "label">Relevant Tags</label>
                      <div className = "control">
                        <input className = "input" type = "text" placeholder = "Add Relevant Tags" ref = "tags" id = "tag"/>
                      </div>
                    </div>

                    <button className = "button is-link is-rounded" onClick = {this.addTag} id = "add-tag">Add Tags</button>
                    <br/><br/>
                    <label className = "label"> Existing Tags:{tags} </label>

                    <div className="field">
                      <label className="label">Current Professor</label>
                      <div className="control">
                        <div className="select">
                          <select ref = "prof" id = "curr_prof">
                            {Professors}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className = "field">
                      <label className = "label">Average Grading</label>
                      <div className = "control">
                        <input type = "text" className = "input" placeholder = "Average Grading" ref = "grading" id = "grading" required/>
                      </div>
                    </div>

                    <div className = "field">
                    <label className = "label">Rating</label>
                      <div className = "control">
                        <input type = "number" className = "input" placeholder = "Rating" ref = "rating" id = "rating" required/>
                      </div>
                    </div>
                    <br/><br/>
                    <div className = "form-btn"><input onClick = {this.handleSubmit} className = "button is-large is-success is-rounded" type = "submit" value = "Add" id = "add-btn" /></div>
                </form>
                
            </div>
      </div>
    );
  }
}



export default CourseForm;