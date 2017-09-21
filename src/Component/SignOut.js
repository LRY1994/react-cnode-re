import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from './Common/Header'
import action from '../Action/Action'


class SignOut extends Component {
    contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.signout = () => {
            this.props.signin();
            this.context.router.history.replace({ pathname: '/' });
        }

    }
    render() {
        return (
            <div>
                <Header title="退出" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <button className="btn btn-red" onClick={this.signout}>确认退出登录？</button>
                    </div>
                </div>
            </div>
        );
    }
}



export default connect((state) => { return { User: state.User }; }, action('User'))(SignOut); 