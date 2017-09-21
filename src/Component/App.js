import React, {Component} from 'react';
import Footer from './Common/Footer';


class App extends Component{
  constructor(props) {
    super(props);
  }
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