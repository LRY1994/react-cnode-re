import React,{Component} from 'react';
import './UserHeaderImg.less';

 class UserHeadImg extends Component {
    render() {
        return (<div className="user-headimg" style={{ backgroundImage: 'url(' + this.props.url + ')' }}></div>)
    }
}
export default UserHeadImg;