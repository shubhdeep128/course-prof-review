import React,{Component} from 'react';
import API from '../../../utils/API.js';
import axios from 'axios'
class UpdateCourse extends Component {
  state  = {
    loadStatus : false,
    course : [],
    Relevant_tags : [],
    Professors : [],
    currentprof : "",
    error : false
  }
  handleChange(event){
    this.setState({currentprof : event.target.value});
  }
  handleSubmit(e) {
      e.preventDefault();
      const { match: { params } } = this.props;
      var Name = this.refs.Name.value;
      var desc = this.refs.desc.value;
      var grading = this.refs.grading.value;
      var rating = this.refs.rating.value;
      var current_prof = this.refs.prof.value;
      var revCount = this.refs.revCount.value;
      if(this.state.Relevant_tags.length < 3)
      {
          alert("Please fill minimum 3 tags!")
      }
      else
      {
      API.patch(`/api/course/${params.courseid}`, {
          Name : Name,
          Description: desc,
          Relevant_tags: this.state.Relevant_tags,
          Current_Professor : current_prof,
          Average_grade: grading,
          Rating : rating,
          revCount: revCount
        }).then(function (response) {
          alert("Course updated successfully!");
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
  }
    addTag(e){
        e.preventDefault();
        var tag = this.refs.tags.value;
        var tags = this.state.Relevant_tags;
        if(tag === "")
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
      componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        axios.all([
          axios.get(`/api/course/${params.courseid}`),
          axios.get("/api/prof")
      ])
      .then(responseArr => {
          this.setState({error:false, resData:responseArr[0].data, course:responseArr[0].data.course,Relevant_tags:responseArr[0].data.course.Relevant_tags,currentprof: responseArr[0].data.course.Current_Professor, loadStatus:true, Professors: responseArr[1].data});
          console.log(responseArr[0]);
          console.log(responseArr[1]);
          console.log(this.state)
      }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
        
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        var Professors = this.state.Professors;
        Professors.sort(compare);
        var tags = this.state.Relevant_tags;
        let that = this;
        tags = tags.map(function(tag,key){
          return(
            <span className="tag is-medium is-success">
            {tag}
            <button type = "button" onClick = {() =>that.deleteTag(key)} className="delete is-small"></button>
          </span>
          )
        }
        )
        console.log(this.state.currentprof)
        Professors = Professors.map(function(professor){
          if(professor._id === that.state.currentprof){
            return(
              <option value = {professor._id} selected>{professor.Name}</option>
            )
          }
          else{
          return(
            <option value = {professor._id}>{professor.Name}</option>
          )
          }
        })

        return(
            <div>
                <div className = "form box">
                <form className = "form">
                  <span className = "is-size-1 has-text-weight-bold has-text-black">Update Course</span><br/><br/>
                    <div className = "field">
                      <label className = "label">Name</label>
                      <div className="control">
                      <input className = "input" defaultValue = {this.state.course.Name} placeholder = "Name" ref = "Name" required/>
                      </div>
                    </div>


                    <div className = "field">
                      <label className = "label">Description</label>
                      <div className = "control">
                        <textarea className = "textarea" defaultValue = {this.state.course.Description} placeholder = "Description" ref= "desc" required/>
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
                    
                    <div className="field">
                      <label className="label">Current Professor</label>
                      <div className="control">
                        <div className="select">
                          <select ref = "prof">
                            {Professors}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className = "field">
                      <label className = "label">Average Grading</label>
                      <div className = "control">
                      <input className = "input" defaultValue = {this.state.course.Average_grade} placeholder = "Average Grading" ref = "grading" required/>
                      </div>
                    </div>

                    <div className = "field">
                    <label className = "label">Rating</label>
                      <div className = "control">
                        <input className = "input" defaultValue = {this.state.course.Rating} placeholder = "Rating" ref = "rating" required/>
                      </div>
                    </div>
                    <div className = "field">
                    <label className = "label">Review Count</label>
                      <div className = "control">
                        <input className = "input" defaultValue = {this.state.course.revCount} placeholder = "revCount" ref = "revCount" required/>
                      </div>
                    </div>
                </form>
                <div className = "form-btn"><input onClick = {this.handleSubmit} className = "button is-large is-success is-rounded" type = "submit" value = "Update" /></div>
            </div>
            </div>
        )
    }
}

export default UpdateCourse;