import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import HttpService from '../../Service/HttpService'
import {connect} from 'react-redux'
import action from '../../Action/Action'
/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
class Footer extends Component {
    static defaultProps = {
        index: 0
    };
    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0
        };

        this.getMessageCount = () => {
            var accesstoken = this.props.User ? this.props.User.accesstoken : '';
            if (accesstoken) {
                HttpService.get('/api/v1/message/count', { accesstoken }, (res) => {
                    this.setState({
                        messageCount: res.data
                    });
                });
            }
        }
    }
    render() {
        var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
        var arr = [];
        arr[this.props.index] = 'on';
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                <ul className="menu" data-flex="box:mean">
                    <li className={arr[0]}>
                        <NavLink to="/">
                            <i className="iconfont icon-shouye"></i>首页
                        </NavLink>
                    </li>
                    <li className={arr[1]}>
                        <NavLink to="/topic/create">
                            <i className="iconfont icon-fabu"></i>发表
                        </NavLink>
                    </li>
                    <li className={arr[2]}>
                        <NavLink to="/my/messages">
                            <i className="iconfont icon-xiaoxi"></i>消息{this.state.messageCount > 0 ? <em>{this.state.messageCount}</em> : ''}
                        </NavLink>
                    </li>
                    <li className={arr[3]}>
                        <NavLink to={myUrl}>
                            <i className="iconfont icon-wode"></i>我的
                        </NavLink>
                    </li>
                </ul>
            </footer>
        );
    }
    componentDidMount() {
        this.getMessageCount();
    }
    shouldComponentUpdate(np, ns) {
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; //防止组件不必要的更新
    }
    componentDidUpdate() {
        this.getMessageCount();
    }
}



const mapStateToProps = (state) => {
    return {
      User: state.User
    }
  }


export default connect(mapStateToProps,null)(Footer);

