import React,{Component} from 'react';
import Footer from './Common/Footer'

class UserView extends Component{
    constructor(){
        super();
        this.state ={
            user:null
        }
    }
    render(){
        return(
            <div>createtopic
               <Footer/>
            </div>
        )
    }
       
};

export default UserView;