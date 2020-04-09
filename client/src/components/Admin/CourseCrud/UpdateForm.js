import React,{Component} from 'react';
import API from '../../../utils/API.js';

class UpdateForm extends Component {
    state  = {
        loadStatus : false,
        course : [],
        Relevant_tags : [],
        error : false
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
        API.get(`/api/course/${params.courseid}`).then((response) => {
          this.setState({error:false, course:response.data.course, loadStatus:true, Relevant_tags: response.data.course.Relevant_tags});
          console.log(this.state.course);
          console.log(this.state.Relevant_tags);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
        
      }
     
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    var tags = this.state.Relevant_tags;
    let that = this;
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