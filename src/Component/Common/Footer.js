import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


class Footer extends Component{
    
    render(){
        return(
            <footer className='common-footer'>
               
                <ul className='menu' data-flex="box:mean">
                    <li> 
                        <NavLink to='/home'>
                            <i className="iconfont icon-shouye"></i>首页
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/topic/create'>
                             <i className="iconfont icon-fabu"></i>发表
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my/message'>
                             <i className="iconfont icon-xiaoxi"></i>消息
                        </NavLink>
                    </li>
                    <li>
                        {/* <NavLink to={`/user/${user.id}`}> */}
                        <NavLink to="/signin">
                             <i className="iconfont icon-wode"></i>我的
                        </NavLink>
                    </li>
                </ul>
                
            </footer>
        )
    }
}

export default Footer;