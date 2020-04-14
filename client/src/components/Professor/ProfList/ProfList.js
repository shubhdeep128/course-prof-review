import React , {Component} from 'react';
import EachProf from './EachProf.js';
import API from '../../../utils/API.js'
import Pagination from './Pagination.js'
import styles from "./ProfList.css"
class ProfList extends Component {
    state={
        loadStatus:false,
        profs: [],
        currentPage: 1,
        profsPerPage: 3,
        error:false
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
    const lastindex = this.state.currentPage*this.state.profsPerPage;
    const firstIndex = lastindex - this.state.profsPerPage;
    const currentProfs = this.state.profs.slice(firstIndex,lastindex);
    var profs = this.state.profs;
    var string = '/prof/'
    if(this.state.loadStatus===true){
      profs = currentProfs.map(function(prof){
        return(
          <div class = "column is-one-third">
            <EachProf name={prof.Name} rating={prof.Rating} average_grade = {prof.Average_grade} prof_id={string + prof._id}/>
          </div> 
        )
      }.bind(this));
    }
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
    
    return(
      <div>
        <div>
          <div class = "columns is-centered is-mobile">
            <div class = "column is-11">
              <div class = "prof-head-box box">
                <div class = "prof-head-title">Professors</div>
              </div>
              </div>
          </div>
          
          <div class = "container">
            <div class = "columns is-centered is-mobile">
              {profs}
            </div>
          </div>
          <footer class = "footer">
            <Pagination profsPerPage = {this.state.profsPerPage} totalProfs = {this.state.profs.length} currentPage = {this.state.currentPage} paginate = {paginate}/>
          </footer>
          
        </div>
      </div>
    );
  }
}



export default ProfList;