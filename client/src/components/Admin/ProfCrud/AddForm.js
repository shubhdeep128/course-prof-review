import React , {Component} from 'react';
import API from '../../../utils/API';

class AddProf extends Component {
  state = {}
  handleSubmit(e){
    e.preventDefault();
    var Name = this.refs.name.value;
    var Description = this.refs.desc.value;
    API.post('/api/prof/add', {
        Name : Name,
        Description: Description,
        Relevant_tags: [],
      }).then(function (response) {
        alert("Professor added successfully!");
      }).catch(function (error) {
        console.log(error);
      });
  }
  render(){
    this.handleSubmit = this.handleSubmit.bind(this)
    return(
      <div className="form">
        <form onSubmit={this.handleSubmit}>
        <div>
        <input type="text" placeholder="Name" ref="name"/>
        </div>
        <div> 
        <textarea type="text" placeholder="Description" ref="desc"/>
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