import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';

import { Tool} from '../../Service/Tool';
import { DataLoad,  Header, Footer, UserHeadImg, GetDataContainer } from '../Common/Common';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.tab = (tabIndex) => {
            // this.setState({
            //     tabIndex:tabIndex
            // })
            this.state.tabIndex = tabIndex;
            this.props.setStateAction(this.state);
        }
    }
    render() {
        var {data, loadAnimation, loadMsg, tabIndex} = this.props.state;
        let { User, match} = this.props;
        let params = match.params;
        User = User ? User : {};
        
        var main = data ? <Home data={data} tabIndex={tabIndex} tab={this.tab} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        var title = params.username === User.loginname ? '个人中心' : params.username + '的个人中心';
        var footer = params.username === User.loginname ? <Footer index="3" /> : null;
        var leftIcon = params.username === User.loginname ? null : 'fanhui';
        var rightIcon = params.username === User.loginname ? 'tuichu' : null;
        return (
            <div>
                <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout" />
                {main}
                {footer}
            </div>
        );
    }
}


/**
 * 个人主页
 * 
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
    render() {
        var {avatar_url, loginname, score, recent_topics, recent_replies, create_at} = this.props.data;
        var {tabIndex} = this.props;
        var arrOn = [];
        var arrDisplay = [];
        arrOn[tabIndex] = 'on';
        arrDisplay[tabIndex] = 'block';
        return (
            <div className="user-index">
                <div className="headimg" data-flex="dir:top main:center cross:center">
                    <UserHeadImg url={avatar_url} />
                    <div className="name">{loginname}</div>
                    <div className="score">积分：{score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册于：{Tool.formatDate(create_at)}</div>
                </div>
                <ul className="tab-nav" data-flex="box:mean">
                    <li onClick={() => { this.props.tab(0) } } className={arrOn[0]}>主题</li>
                    <li onClick={() => { this.props.tab(1) } } className={arrOn[1]}>回复</li>
                </ul>
                <HomeList list={recent_topics} display={arrDisplay[0]} />
                <HomeList list={recent_replies} display={arrDisplay[1]} />
            </div>
        );
    }
}

/**
 * 发布的主题和回复的主题列表
 * 
 * @class HomeList
 * @extends {Component}
 */
class HomeList extends Component {
    render() {
        var {list, display} = this.props;
        return (
            <ul className="list" style={{ display: display }}>
                {
                    list.map((item, index) => {
                        let {id, title, last_reply_at} = item;
                        return (
                            <li key={index}>
                                <NavLink data-flex="box:last" to={`/topic/${id}`}>
                                    <div className="tit">{title}</div>
                                    <time className>{Tool.formatDate(last_reply_at)}</time>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}
export default GetDataContainer(Main,{
    id: 'UserView',  //应用关联使用的redux
    url: (props, state) => {
        return '/api/v1/user/' + props.match.params.username;
    },
    data: {},
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});