import React,{Component} from 'react';
import Footer from './Common/Footer';
import Nav from './Nav';
import List from './List';
import queryString from 'query-string';
import'./Home.less';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // var {data} = this.props.state;
        var tab = queryString.parse(this.props.params).tab || 'all';
        return (
            <div className="index-list-box">
                <Nav tab={tab} />
                {/* {
                    data.length > 0 ? <List list={data} /> : null
                } */}
                <Footer/>
            </div>
        );
    }
}



export default Main;