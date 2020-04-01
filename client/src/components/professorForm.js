import React , {Component} from 'react';
import styles from './form.css';
import API from '../utils/API';

class ProfessorForm extends Component {
    state = {}
    handleSubmit(e){
      e.preventDefault();
      var Name = this.refs.name.value;
      var Description = this.refs.desc.value;
      
      
      API.post('/api/professor/add', {
        Name: Name,
        Description: Description, 
        Course: [], 
        Reviews: [], 
        Relevant_tags: []
        }).then(function (response) {
          alert("Professor added sucessfully!");
          window.location = '/professor/add';
        }).catch(function (error) {
          console.log(error);
        });
    }
    render(){
      this.handleSubmit = this.handleSubmit.bind(this)
      return(
        <div className="form">
          <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" ref="name"/> 
          <textarea type="text" placeholder="Description" ref="desc"/>
          <input type="text" placeholder="Relevent Tags" ref="tags"/>
  
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }  

  export default ProfessorForm;