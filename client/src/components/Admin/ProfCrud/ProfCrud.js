import React,{Component} from 'react';
import EachProf from './EachProf.js';
import API from '../../../utils/API.js'


class ProfCrud extends Component {
    state={
        loadStatus:false,
        profs: [],
        error:false,
      }
      onDelete = (id) => {
        this.setState(this.props.location.state)
        API.delete(`/api/prof/${id}`).then((response) => {
            console.log(response);
            alert("Course Deleted!!")
        })
      }
      componentDidMount(){
          this.setState(this.props.location.state)
            API.get("/api/prof/")
          .then(responseArr => {
              this.setState({error:false, profs:responseArr.data,  loadStatus:true});
              console.log(responseArr);
          }).catch(function (error) {
              console.log("ERROR LOADING DATA");
              console.log(error);
            });
        
      }
    render(){
    var profs = this.state.profs;
    var string = '/admin/profs/update/'
    if(this.state.loadStatus===true){
      profs = profs.map(function(prof,i){
        return(
          <div className = "tile" key = {i}>
            <EachProf name = {prof.Name} rating = {prof.Rating} desc = {prof.Description} tags = {prof.Relevant_tags} profid = {string+prof._id} onClick={this.onDelete.bind(this,prof._id)}/>
          </div>
          
        )
      }.bind(this));
    }
    if(this.props.current_user.Roles !== 'Admin'){
      console.log(this.props.current_user.Roles)
      return(
          <div className = "container has-text-centered">
              <p className = "title">Unauthorized</p>
              <p className = "subtitle">Log in as an Admin to Continue</p>
          </div>
      )
  }
        return(
          <div>
            <div className = "container">
               <a className = "button is-large is-black is-rounded" href = "/admin/profs/add">Add a Professor</a>
              {profs}   
            </div>
          </div>
        )
    }
}

export default ProfCrud;