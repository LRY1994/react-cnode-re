import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import'./Nav.less';

class Nav extends Component{
    // constructor(props){
    //     super(props);
    // }
    
    render(){
        return(
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li> 
                        <NavLink to='/?tab=all' activeClassName="active">全部</NavLink>                                                   
                    </li>
                    <li>
                        <NavLink to='/?tab=good'activeClassName="active">精华</NavLink>                                                
                    </li>
                    <li>
                        <NavLink to='/?tab=share'activeClassName="active">问答</NavLink>                                                   
                    </li>
                    <li>
                        <NavLink to='/?tab=job'activeClassName="active">招聘</NavLink>                                                 
                    </li>
                </ul>
                
            </nav>
        )
    }
}

export default Nav;