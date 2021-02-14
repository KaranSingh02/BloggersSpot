import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Home from './components/blogs/home';
import Register from './components/register/register';
import Postregister from './components/register/post_register';
import Login from './components/login/login';
import Logout from './components/login/logout';
import Profile from './components/profile/profile';
import Updateprofile from './components/profile/Updateprofile';
import Menu from './components/navbar';
import Author from './components/authors';
import Blog from './components/blogs/new_blog';
import Detail from './components/blogs/blog_detail';


const App = () => {
   const check = useSelector( state => state.userReducer.isLoggedIn );

  // useEffect = () => {
  //   setCheck(this.props.reducer_state.check)
  // }
  return(
      <div className="App">
          <BrowserRouter>
          <Menu />
                  <Switch>
                      { !check && <Route exact path='/' component={Register} /> }
                      { check && <Route exact path='/' component={Home} /> }
                      <Route exact path='/home' component={Home} />
                      
                      <Route path='/register' component={Register} />
                      <Route path='/success-register' component={Postregister} />


                      <Route path='/login' component={Login} />
                      <Route path='/logout' component={Logout} />
                      <Route path='/new-blog' render={(props) => <Blog {...props}/>} />
                      <Route path='/profile/:userid' component={Profile} />
                      <Route path='/update-profile' component={Updateprofile} />
                      <Route path='/authors' component={Author} />
                      {/* <Route path='/new-blog' component={Blog} /> */}
                      <Route path='/authors' component={Author} />
                      <Route path='/blog-detail/:blogid' component={Detail} />
                  
                  </Switch>

          </BrowserRouter>
      </div>
  );
}


//Accessing the state of the reducer


export default (App);
