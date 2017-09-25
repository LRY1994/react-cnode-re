import React ,{Component} from 'react';
import {BrowerRouter,IndexRoute,Switch,Route,Redirect ,Router} from 'react-router-dom';
import Home from '../Component/Home/Home';
import UserView from '../Component/My/UserView';
import MyMessage from '../Component/My/MyMessage';
import Topic from '../Component/Topic/Topic'
import TopicCreate from '../Component/Topic/TopicCreate';
import SignIn from '../Component/SignIn';
import SignOut from '../Component/SignOut';

import createBrowserHistory from 'history/createBrowserHistory';
const routes=[
    
    // {
    //     path:'/',     
    //     exact:false,
    //     component:App
    //     // childRoutes:[
    //     //     {path:"?tab=all",component: All},
           
    //     // ]
    // },
    // {
    //     path:'/',
    //     exact:true,
    //     component:App
    // },
    {
        path:'/home',
        exact:true,
        component:Home
    },
    {
        path:'/topic/create',
        exact:false,
        component:TopicCreate
    },
    {
        path:'/topic/:id',
        exact:false,
        component:Topic
    },
    {
        path:'/user/:username',
        exact:false,
        component:UserView
    },
    {
        path:'/my/message',
        exact:false,
        component:MyMessage
    },
    {
        path:'/signin',
        exact:false,
        component:SignIn
    },
    {
        path:'/signout',
        exact:false,
        component:SignOut
    }
    
    
]

const history = createBrowserHistory();
const RouteConfig = (
    <Router history={history}>             
        <Switch>
           
                {
                routes.map((r,i)=>(
                    <Route
                        key={i}
                        path={r.path}
                        component={r.component}
                    />
                ))
            }     
            <Redirect from='' to="/home" />
                   
        </Switch>
    </Router>
)
export default RouteConfig;