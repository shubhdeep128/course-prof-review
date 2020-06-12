import React,{Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home.js';
import OuterContainer from './components/OuterContainer/OuterContainer.js'
import CourseForm from './components/Admin/CourseCrud/AddForm.js';
import CourseList from './components/Course/CourseList/CourseList.js';
import CourseDetails from './components/Course/CourseDetails/CourseDetails.js'
import RevUpdate from './components/Course/CourseDetails/RevUpdate.js';
import Admin from './components/Admin/Admin.js'
import CourseCrud from './components/Admin/CourseCrud/CourseCrud.js';
import UpdateCourse from './components/Admin/CourseCrud/UpdateForm.js';
import ProfCrud from './components/Admin/ProfCrud/ProfCrud.js';
import AddProf from './components/Admin/ProfCrud/AddForm.js';
import UpdateProf from './components/Admin/ProfCrud/UpdateForm.js';
import ProfList from './components/Professor/ProfList/ProfList.js'
import ProfDetails from './components/Professor/ProfDetails/ProfDetails.js';
import NotFound from './components/NotFound.js'
import API from './utils/API'
import BlogOverview from './shards-dashboard/src/views/BlogOverview'
import Test from './components/Test'
class App extends Component {
  state = {
    current_user: [],
    error: false,
    loginStatus: false,
    loadStatus: false
  }
  componentDidMount(){
      API.get("/api/current_user")
      .then(response => {
          this.setState({error:false,loadStatus:true,loginStatus:response.data.loggedIn, current_user: response.data.user});
          console.log(this.state.current_user,this.state.loginStatus);
      }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
  }

  render(){
  return (
      <div>
      <OuterContainer current_user={this.state.current_user} loginStatus={this.state.loginStatus}/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/admin' render = {(props) => <Admin {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>} />
            <Route exact path='/admin/courses/add' render = {(props) => <CourseForm {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  /> 
            <Route exact path='/course' render = {(props) => <CourseList {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path='/course/:courseid'render = {(props) => <CourseDetails {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path='/prof' render = {(props) => <ProfList {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/prof/:profid' render = {(props) => <ProfDetails {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  /> 
            <Route exact path='/admin/dashboard' component = {BlogOverview} />
            <Route exact path='/admin/courses' render = {(props) => <CourseCrud {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>} />
            <Route exact path='/admin/courses/update/:courseid' render = {(props) => <UpdateCourse {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/admin/profs' render = {(props) => <ProfCrud {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/admin/profs/add' render = {(props) => <AddProf {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/admin/profs/update/:profid' render = {(props) => <UpdateProf {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/course/RevUpdate/:id' render = {(props) => <RevUpdate {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  />
            <Route exact path = '/prof/RevUpdate/:id' render = {(props) => <RevUpdate {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus}/>}  /> 
            <Route exact path = '/test' render = {(props) => <Test {...props} current_user = {this.state.current_user} loginStatus = {this.state.loginStatus} />} />
            <Route exact path = '*' component = {NotFound} status={404} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}
}

export default App;
