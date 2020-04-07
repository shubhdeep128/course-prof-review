import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home.js';
import CourseForm from './components/Admin/CourseCrud/form.js';
import CourseList from './components/CourseList/CourseList.js';
import CourseDetails from './components/CourseDetails/CourseDetails.js'
import Login from './components/Admin/Login.js'
import Logout from './components/Admin/Logout.js'
import Admin from './components/Admin/Admin.js'
import CourseCrud from './components/Admin/CourseCrud/CourseCrud.js';
import UpdateForm from './components/Admin/CourseCrud/UpdateForm.js';
import ProfCrud from './components/Admin/ProfCrud/ProfCrud.js';
import AddProf from './components/Admin/ProfCrud/AddForm.js';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component = {Home} />
      <Route exact path='/admin' component = {Admin} />
      <Route exact path='/admin/login' component = {Login} />
      <Route exact path='/admin/logout' component = {Logout} />
      <Route exact path='/admin/courses/add' component = {CourseForm} /> 
      <Route exact path='/course' component= {CourseList} />
      <Route exact path='/course/:courseid' component = {CourseDetails} />
      <Route exact path='/admin/courses' component= {CourseCrud} />
      <Route exact path='/admin/courses/:courseid' component = {UpdateForm} />
      <Route exact path = '/admin/profs' component = {ProfCrud} />
      <Route exact path = '/admin/profs/add' component = {AddProf} />
    </div>
    </BrowserRouter>
  );
}

export default App;
