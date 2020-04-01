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

    addMovie(e){
        e.preventDefault()
        var desc = this.refs.desc.value;
        var title = this.refs.title.value;
        var year = Number(this.refs.year.value);
        var cast = this.refs.cast.value.split(',');
        cast = cast.map(item => item.trim());
        console.log(cast);
        if(Number.isNaN(year)||year < 1888){
          alert('Year must be a number greater than 1888. The first movie in the world was released in 1888');
        }
        else{
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
      }
  }

export default CourseProfessor