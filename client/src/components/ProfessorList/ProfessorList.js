import React , {Component} from 'react';
import EachProfessor from './EachProfessor.js';
import API from '../../utils/API.js'

class ProfessorList extends Component {
    state={
        loadStatus:false,
        professors: [],
        error:false
      }
      componentDidMount(){
        this.setState(this.props.location.state)
        API.get('/api/professor').then((response) => {
          this.setState({error:false, professors:response.data, loadStatus:true});
          console.log(response.data);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
          window.location = '/'
        });
      }
  
  render(){
    var professors = this.state.professors;
    if(this.state.loadStatus==true){
      professors = professors.map(function(professor){
        return(
          <Eachprofessor tags={professor.Relevant_tags} name={Professor.Name} desc={Professor.Description}/>
        )
      }.bind(this));
    }
    
    return(
      <div className="professor-list">
          {professors}
      </div> 
    );
  }
}



export default ProfessorList;