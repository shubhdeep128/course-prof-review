import React,{Component} from 'react';
import API from '../../../utils/API.js';
import axios from "axios";

class UpdateForm extends Component {
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
            Current_Professor : this.state.currentprof,
            Average_grade: grading,
            Rating : rating
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
          this.setState({error:false, resData:responseArr[0].data, course:responseArr[0].data.course,currentprof: responseArr[0].data.Current_Professor, loadStatus:true, Professors: responseArr[1].data});
          console.log(responseArr[0]);
          console.log(responseArr[1]);
      }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
        
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    var tags = this.state.Relevant_tags;
    let that = this;
    var Professors = this.state.Professors;
    Professors.sort(compare);
    Professors = Professors.map(function(professor){
      return(
      <option value = {professor._id}>{professor.Name}</option>
      )
    })
    tags = tags.map(function(tag,key){
      return(
      <div>
          <ul><li>{tag}
          <button onClick = {() =>that.deleteTag(key)}>
               Delete
               </button>
          </li></ul>
      </div>
      )
    }
    )

        return(
            <div>
                
                <form onSubmit = {this.handleSubmit} >
                    <label>Name</label>
                    <input defaultValue = {this.state.course.Name} placeholder = "Name" ref = "Name" required/>
                    <br></br>
                    <label>Description</label>
                    <textarea defaultValue = {this.state.course.Description} placeholder = "Description" ref= "desc" required/>
                    <br></br>
                    <label>Relevant Tags</label>
                    <input type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                    <div> Existing Tags:{tags} </div>
                    <button onClick = {this.addTag}>Add Tags</button>
                    <br></br>
                    <label>Average Grading</label>
                    <input defaultValue = {this.state.course.Average_grade} placeholder = "Average Grading" ref = "grading" required/>
                    <br></br>
                    <label>Current Professor :</label>
                    <select value = {this.state.value} onChange = {this.handleChange}>
                      {Professors}
                    </select>
                    <br></br>
                    <label>Rating</label>
                    <input defaultValue = {this.state.course.Rating} placeholder = "Rating" ref = "rating" required/>
                    <br></br>
                    <input type = "submit" value = "Update" />
                    <br></br>
                </form>
            </div>
        )
    }
}

export default UpdateForm;