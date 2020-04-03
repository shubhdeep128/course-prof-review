import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home.js';
import CourseForm from './components/form.js';
import CourseList from './components/CourseList/CourseList.js';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component = {Home} />
      <Route exact path='/course/add' component = {CourseForm} /> 
      <Route exact path='/course' component= {CourseList} />
    </div>
    </BrowserRouter>
  );
}

export default App;
