import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


class Nav extends Component{
   
    
    render(){
        return(
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li> 
                        <NavLink to='/home?tab=all' activeClassName="active">全部</NavLink>                                                   
                    </li>
                    <li>
                        <NavLink to='/home?tab=good'activeClassName="active">精华</NavLink>                                                
                    </li>
                    <li>
                        <NavLink to='/home?tab=share'activeClassName="active">问答</NavLink>                                                   
                    </li>
                    <li>
                        <NavLink to='/home?tab=job'activeClassName="active">招聘</NavLink>                                                 
                    </li>
                </ul>
                
            </nav>
        )
    }
}

export default Nav;