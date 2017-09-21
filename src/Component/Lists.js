import React, {Component} from 'react';
import {NavLink} from'react-router-dom';
import {Tool} from '../Service/Tool';
import UserHeadImg from './Common/UserHeaderImg';
import TabIcon from './Common/TabIcon'

import queryString from 'query-string'
class ListItem extends Component {
    render() {
        let {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
        return (
            <li>
                <NavLink to={`/topic/${id}`}>
                    <div data-flex="box:first">
                        <div className="font" data-flex="cross:center"><TabIcon {...this.props} /></div>
                        <h3 className="tit">{title}</h3>
                    </div>
                    <div className="bottom" data-flex="box:first">
                        <div className="author" data-flex="cross:center">
                            <UserHeadImg url={author.avatar_url} />
                        </div>
                        <div className="con" data-flex="dir:top main:center">
                            <p data-flex="cross:center box:last">
                                <span className="name">{author.loginname}</span>
                                <span className="count">{reply_count}/{visit_count}</span>
                            </p>
                            <p data-flex="cross:center box:last">
                                <time className="create">{Tool.formatDate(create_at)}</time>
                                <time className="re">{Tool.formatDate(last_reply_at)}</time>
                            </p>
                        </div>
                    </div>
                </NavLink>
            </li>
        );
    }
    
}


class Lists extends Component {
    render() {
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={item.id} {...item} />
                    })
                }
            </ul>
        );
    }
}

export default Lists;
