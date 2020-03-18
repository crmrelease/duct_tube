import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import TokenPage from './components/views/TokenPage/TokenPage';
import VideoUploadPage from './components/views/videoUploadPage/videoUploadPage';
import NavBar from "./components/views/NavBar/NavBar";
import Auth from './hoc/auth';


function App() {
  return (
     <Router>
      <div>
        {
         
        }
        <NavBar />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/join" component={Auth(RegisterPage,false)}/>
          <Route exact path="/token" component={Auth(TokenPage,false)}/>
          <Route exact path="/video/upload" component={Auth(VideoUploadPage,true)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
