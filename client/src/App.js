import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home.js';
import CourseForm from './components/Admin/CourseCrud/AddForm.js';
import CourseList from './components/CourseList/CourseList.js';
import CourseDetails from './components/CourseDetails/CourseDetails.js'
import Admin from './components/Admin/Admin.js'
import CourseCrud from './components/Admin/CourseCrud/CourseCrud.js';
import UpdateCourse from './components/Admin/CourseCrud/UpdateForm.js';
import ProfCrud from './components/Admin/ProfCrud/ProfCrud.js';
import AddProf from './components/Admin/ProfCrud/AddForm.js';
import UpdateProf from './components/Admin/ProfCrud/UpdateForm.js';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component = {Home} />
      <Route exact path='/admin' component = {Admin} />
      <Route exact path='/admin/courses/add' component = {CourseForm} /> 
      <Route exact path='/course' component= {CourseList} />
      <Route exact path='/course/:courseid' component = {CourseDetails} />
      <Route exact path='/admin/courses' component= {CourseCrud} />
      <Route exact path='/admin/courses/update/:courseid' component = {UpdateCourse} />
      <Route exact path = '/admin/profs' component = {ProfCrud} />
      <Route exact path = '/admin/profs/add' component = {AddProf} />
      <Route exact path = '/admin/profs/update/:profid' component = {UpdateProf} /> 

    </div>
    </BrowserRouter>
  );
}

export default App;
