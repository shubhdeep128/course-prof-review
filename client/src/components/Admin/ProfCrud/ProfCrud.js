import React,{Component} from 'react';
import EachProf from './EachProf.js';
import API from '../../../utils/API.js'

class ProfCrud extends Component {
    state={
        loadStatus:false,
        profs: [],
        error:false
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
        API.get('/api/prof').then((response) => {
          this.setState({error:false, profs:response.data, loadStatus:true});
          console.log(response.data);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
      }
    render(){
    var profs = this.state.profs;
    var string = '/admin/profs/update/'
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
        return(
            <div class = "container">
               <a href = "/admin/profs/add">Add a Professor</a>
              {profs}   
            </div>
        )
    }
}

export default ProfCrud;