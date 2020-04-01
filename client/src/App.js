import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home.js';
import CourseForm from './components/courseForm.js';
import ProfessorForm from './components/professorForm.js';
import CourseList from './components/CourseList/CourseList.js';
import ProfessorList from './components/CourseList/ProfessorList.js';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component = {Home} />
      <Route exact path='/course/add' component = {CourseForm} /> 
      <Route exact path='/professor/add' component = {ProfessorForm} /> 
      <Route exact path='/course' component= {CourseList} />
      <Route exact path='/professor' component= {ProfessorList} />
    </div>
    </BrowserRouter>
  );
}

export default App;
