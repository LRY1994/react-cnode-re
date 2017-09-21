import React,{Component} from 'react';
import Footer from './Common/Footer';
import Nav from './Nav';
import HomeContainer from './HomeContainer';
import Lists from './Lists'
import queryString from 'query-string';



class Home extends Component {
    
    render() {
        var {data} = this.props.state;
        var tab = queryString.parse(this.props.params).tab || 'all';
        return (
            <div className="index-list-box">
                <Nav tab={tab} />
                {
                    data.length > 0 ? <Lists list={data} /> : null
                }
                <Footer index="0"/>
            </div>
        );
    }
}

// export default Home;

export default HomeContainer(Home,{
    id: 'IndexList',  //应用关联使用的redux 
    url: '/api/v1/topics',
    data: (props, state) => { //发送给服务器的数据
        var {page, limit, mdrender} = state;
        return {
            tab: queryString.parse(props.location.search).tab || 'all',
            page,
            limit,
            mdrender
        }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});
