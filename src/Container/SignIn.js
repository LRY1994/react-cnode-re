import {connect} from 'react-redux';
import {signinSuccess} from '../Reducer/reducer'
import React,{Component,PropTypes} from 'react';
import SignIn from '../Component/SignIn'
import Tool from '../Service/Tool'


  class SignInContainer extends Component{
    static PropTypes = {
      onLogin: PropTypes.func
    }
    constructor(){
      super()
      this.state = {accesstoken:''}
    }
    handleLogin(token){
      if(!token) return  alert('不能为空');
      if(this.props.onLogin){
        this.props.onLogin(token);
      }

    }
      render(){
          return (
            <SignIn
              onLogin={this.handleLogin.bind(this)}
            />
              

          )
      }
      
  }

  const mapStateToProps = (state) => {
    return 
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        signinSuccess: (token) => {
        dispatch(signinSuccess(token))
      }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInContainer)