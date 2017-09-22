/**
 * 提示登录

 */

import React,{Component} from 'react'
import{NavLink} from 'react-router-dom'
export class TipMsgSignin extends Component {
    render() {
        return (
            <div className="tip-msg-signin">
                你还未登录，请先<NavLink to="/signin">登录</NavLink>
            </div>
        );
    }
}
export default TipMsgSignin;