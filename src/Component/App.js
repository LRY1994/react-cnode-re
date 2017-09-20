import React, {Component} from 'react';
import Footer from './Common/Footer';
import Home from './Home'

class App extends Component{
  render() {
    return (
      <div>      
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default App;