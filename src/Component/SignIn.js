import React, { Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header} from './Common/Header'
import HttpService from '../Service/HttpService';
// import action from '../Action/Action'
import {signinSuccess} from '../Action/Action'

class SignIn extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            button: '登录'
        };
        this.signin = () => {
            var accesstoken = this.refs.accesstoken.value;
            if (!accesstoken) return alert('不能为空！');
            this.setState({ button: '登录中...' });
            HttpService.post('/api/v1/accesstoken', { accesstoken }, (res) => {
                if (res.success) {
                    alert('登录成功');
                    res.accesstoken = accesstoken;
                    // console.log('登陆成功后：');
                    // console.log(this.props);
                    
                    this.props.signinSuccess(res);
                 
                    this.context.router.history.push({
                        pathname: '/user/' + res.loginname
                    });
                } else {
                    alert('登录失败');
                    this.setState({ button: '登录' });
                }

            }, () => {
                alert('登录失败！');
                this.setState({ button: '登录' });
            });
        }

    }
    render() {
        return (
            <div>
                <Header title="登录" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <div className="text"><input ref="accesstoken" type="text" placeholder="Access Token" /></div>
                        <button className="btn" onClick={this.signin}>{this.state.button}</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      User: state.User
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        signinSuccess: (user) => {
            dispatch(signinSuccess(user))
        }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignIn); //连接redux

// export default SignIn;
// export default connect((state) => { return { User: state.User }; }, action())(SignIn); //连接redux