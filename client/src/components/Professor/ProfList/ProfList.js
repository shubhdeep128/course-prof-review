import React , {Component} from 'react';
import EachProf from './EachProf.js';
import API from '../../../utils/API.js'
import Pagination from './Pagination.js'
import WOW from 'wowjs'
import "./ProfList.css"
class ProfList extends Component {
  constructor(props){
    super(props)
    new WOW.WOW().init()
  }
    state={
        loadStatus:false,
        profs: [],
        currentPage: 1,
        profsPerPage: 3,
        error:false,
        search: ''
      }
      handleChange(event){
        this.setState({search : event.target.value});
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
    this.handleChange = this.handleChange.bind(this);
    const lastindex = this.state.currentPage*this.state.profsPerPage;
    const firstIndex = lastindex - this.state.profsPerPage;
    var profs = this.state.profs;
    var string = '/prof/'
    let filteredCourses = profs.filter(
      (prof) => {
        return prof.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    const currentProfs = filteredCourses.slice(firstIndex,lastindex);
    
    if(this.state.loadStatus===true){
      profs = currentProfs.map(function(prof){
        return(
          <div className = "column is-one-third">
            <EachProf name={prof.Name} rating={prof.Rating} average_grade = {prof.Average_grade} prof_id={string + prof._id}/>
          </div> 
        )
      });
    }
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }
    
    return(
      <div>
        <div>
          <div className = "columns is-centered is-mobile">
            <div className = "column is-11 wow fadeIn">
              <div className = "prof-head-box box">
                <div className = "prof-head-title">Professors</div>
              </div>
              </div>
          </div>
          <div className = "container has-text-centered">
            <div className="control has-icons-left has-icons-right">
              <input className = "input is-large is-rounded" type = "text" placeholder = "Search By Name" onChange = {this.handleChange}/>
              <span className="icon is-small is-right">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div className = "container wow fadeInUp">
            <div className = "columns is-centered is-mobile">
              {profs}
            </div>
          </div>
          <footer className = "footer">
            <Pagination profsPerPage = {this.state.profsPerPage} totalProfs = {this.state.profs.length} currentPage = {this.state.currentPage} paginate = {paginate}/>
          </footer>
          
        </div>
      </div>
    );
  }
}



export default ProfList;