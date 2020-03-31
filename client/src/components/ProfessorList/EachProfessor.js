import React , {Component} from 'react';


class EachProfessor extends Component {
  
  render(){
    
    return(
      
      <div className="professor-container">
          <h1> {this.props.name} </h1>
          <h1>{this.props.professor_id}</h1>
          <div className="grading-box">
              {this.props.grading}
          </div>
      </div> 
    );
  }
}



export default EachProfessor;