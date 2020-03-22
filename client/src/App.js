import React, { Suspense } from 'react';
import {
  BrowserRouter,
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
import videoDetailPage from './components/views/videoDetailPage/videoDetailPage';
import Subscription from './components/views/Subscription/Subscription';
import NavBar from "./components/views/NavBar/NavBar";
import Profile from "./components/views/ProfilePage/ProfilePage";
import Auth from './hoc/auth';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}> 
      <NavBar />
<div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
  <BrowserRouter>
  <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/join" component={Auth(RegisterPage,false)}/>
          <Route exact path="/token" component={Auth(TokenPage,false)}/>
          <Route exact path="/videos/:videoId" component={Auth(videoDetailPage,null)}/>
          <Route exact path="/video/upload" component={Auth(VideoUploadPage,true)}/>
          <Route exact path="/subscription" component={Auth(Subscription,true)}/>
          <Route exact path="/profile" component={Auth(Profile,true)}/>
  </Switch>
  </BrowserRouter>
</div>
</Suspense>
  );
}

export default App;
