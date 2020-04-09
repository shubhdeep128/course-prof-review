import React,{Component} from 'react';
import EachProf from './EachProf.js';
import API from '../../../utils/API.js'
import axios from 'axios';


class ProfCrud extends Component {
    state={
        loadStatus:false,
        profs: [],
        error:false,
        current_user: {}
      }
      onDelete = (id) => {
        this.setState(this.props.location.state)
        API.delete(`/api/prof/${id}`).then((response) => {
            console.log(response);
            alert("Course Deleted!!")
        })
      }
      componentDidMount(){
        const { match: { params } } = this.props;
          this.setState(this.props.location.state)
          axios.all([
              axios.get("/api/prof/"),
              axios.get("/api/current_user")
          ])
          .then(responseArr => {
              this.setState({error:false, profs:responseArr[0].data,  loadStatus:true, current_user: responseArr[1].data});
              console.log(responseArr);
          }).catch(function (error) {
              console.log("ERROR LOADING DATA");
              console.log(error);
            });
        
      }
    render(){
    var profs = this.state.profs;
    var string = '/admin/profs/'
    var profs = this.state.profs;
    if(this.state.loadStatus===true){
      profs = profs.map(function(prof){
        return(
          <div class = "tile">
            <EachProf name = {prof.Name} desc = {prof.Description} tags = {prof.Relevant_tags} profid = {string+prof._id} onClick={this.onDelete.bind(this,prof._id)}/>
          </div>
          
        )
      }.bind(this));
    }
    if(this.state.current_user.Roles != 'Admin'){
      console.log(this.state.current_user.Roles)
      return(
          <div>
              Unathorized
          </div>
      )
  }
        return(
            <div class = "container">
               <a href = "/admin/profs/add">Add a Professor</a>
              {profs}   
            </div>
        )
    }
}

export default ProfCrud;